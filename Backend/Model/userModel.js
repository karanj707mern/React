const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected!'))
require('dotenv').config();

const schema = mongoose.Schema;
const userSchema = new schema ({
    email: String ,
    password:String
});
const userModel = mongoose.model("user",userSchema);
module.exports = userModel
