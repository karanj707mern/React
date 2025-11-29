const userModel = require("../Model/userModel")
require("dotenv").config();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const refreshSecret = process.env.REFRESH_SECRET || process.env.JWT_SECRET; 
// helper to read cookie without cookie-parser
function getCookie(req, name) {
    const header = req.headers && req.headers.cookie;
    if (!header) return undefined;
    const cookies = header.split(';').map(c => c.trim());
    for (const c of cookies) {
        const [k, ...v] = c.split('=');
        if (k === name) return decodeURIComponent(v.join('='));
    }
    return undefined;
}

const Register = async (req, res) => {
    const { email, password, role, adminKey } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        let assignedRole = 'user';
        if (role === 'admin') {
            if (adminKey && adminKey === process.env.ADMIN_KEY) {
                assignedRole = 'admin'
            } else {
                return res.status(403).json({ message: 'Invalid admin key for role assignment' })
            }
        }

        const newUser = new userModel({ email, password: hashedPassword, role: assignedRole });
        await newUser.save();
        return res.status(201).json({ message: "User registered successfully" })
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" })
    }

}

const Login = async (req, res) => {
    const { email, password } = req.body;
    try {

        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found,Please Register first" })
        }
        if (existingUser) {

            const truepassword = await bcrypt.compare(password, existingUser.password);
            if (!truepassword) {
                return res.status(400).json({ message: "Invalid Password " })
            }
        }
     
        const accessToken = jwt.sign({ email: existingUser.email, id: existingUser._id || existingUser.id, role: existingUser.role }, secret, { expiresIn: "1h" });

        // create refresh token (long-lived) and persist it
        const refreshToken = jwt.sign({ id: existingUser._id || existingUser.id }, refreshSecret, { expiresIn: '30d' });
        // ensure array exists
        existingUser.refreshTokens = existingUser.refreshTokens || [];
        existingUser.refreshTokens = [refreshToken];
        await existingUser.save();


        // send refresh token as httpOnly cookie (recommended)
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        };
        res.cookie && res.cookie('refreshToken', refreshToken, cookieOptions);

        const userSafe = existingUser.toObject ? existingUser.toObject() : existingUser;
        if (userSafe.password) delete userSafe.password;
        if (userSafe.refreshTokens) delete userSafe.refreshTokens; // don't leak refresh tokens
        return res.status(200).json({
            message: "Login Successful",
            user: userSafe,
            accessToken: accessToken
        })

    }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong" })
    }



}




const refreshTokenHandler = async (req, res) => {
    try {
        // read token from cookie or body
        const token = getCookie(req, 'refreshToken') || req.body.refreshToken || req.headers['x-refresh-token'];
        if (!token) return res.status(401).json({ message: 'No refresh token provided' });

        let payload;
        try {
            payload = jwt.verify(token, refreshSecret);
        } catch (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const user = await userModel.findById(payload.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (!user.refreshTokens || !user.refreshTokens.includes(token)) {
            return res.status(403).json({ message: 'Refresh token revoked' });
        }

        // issue new access token
        const newAccessToken = jwt.sign({ email: user.email, id: user._id, role: user.role }, secret, { expiresIn: '1h' });
        return res.json({ accessToken: newAccessToken });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

// Logout / revoke refresh token
const logout = async (req, res) => {
    try {
        const token = getCookie(req, 'refreshToken') || req.body.refreshToken || req.headers['x-refresh-token'];
        if (token) {
            // remove from any user that has it
            await userModel.updateOne({ refreshTokens: token }, { $pull: { refreshTokens: token } });
        }
        // clear cookie if possible
        res.clearCookie && res.clearCookie('refreshToken');
        return res.sendStatus(204);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

// Get all users (admin only)
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password -refreshTokens');
        return res.json({ users });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

// Change user role (admin only)
const changeUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    try {
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role. Must be "user" or "admin"' });
        }
        const user = await userModel.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.role = role;
        await user.save();

        const userSafe = user.toObject ? user.toObject() : user;
        if (userSafe.password) delete userSafe.password;
        if (userSafe.refreshTokens) delete userSafe.refreshTokens;

        return res.json({ message: 'User role updated', user: userSafe });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

module.exports = { Register, Login, refreshTokenHandler, logout, getAllUsers, changeUserRole };