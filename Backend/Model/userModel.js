const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected!'))

const schema = mongoose.Schema;
const userSchema = new schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    refreshTokens: { type: [String], default: [] }
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel
