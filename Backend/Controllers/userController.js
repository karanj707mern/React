const userModel = require("../Model/userModel")
require("dotenv").config();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const Register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ email, password: hashedPassword });
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

        const existingUser = await userModel.findOne({ email});
        if (!existingUser) {
            return res.status(404).json({ message: "User not found,Please Register first" })
        }
        if (existingUser) {

            const truepassword = await bcrypt.compare(password, existingUser.password);
            if (!truepassword) {
                return res.status(400).json({ message: "Invalid Password " })
            }
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id || existingUser.id }, secret, { expiresIn: "1h" });
        return res.status(200).json({
            message: "Login Successful",
            user: existingUser,
            token: token
        })

    }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong" })
    }



}


module.exports = { Register, Login };