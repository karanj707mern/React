const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected!'))
  .catch(err => console.error('Connection error', err));
    const Schema = mongoose.Schema;
    const prSchema = new Schema({
    catid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category' // References the 'Category' model
        },
    prname:String,
    primage:String,
    prprice:Number,
    discount:Number
    });
const prcatModel = mongoose.model('product', prSchema);
module.exports = prcatModel;