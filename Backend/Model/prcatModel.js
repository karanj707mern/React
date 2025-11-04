const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/nodejs')
  .then(() => console.log('Connected!'));
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
module.exports = prcatModel