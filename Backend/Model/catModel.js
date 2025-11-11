const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected!'))
  .catch(err => console.error('Connection error', err));

  const Schema = mongoose.Schema;
  const catSchema = new Schema({
  catname: String
});
const catModel = mongoose.model('category', catSchema);
module.exports = catModel