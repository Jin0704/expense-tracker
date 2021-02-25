const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RecordSchema = new Schema({
  name: String,
  category: String,
  date: String,
  amount: Number,
  totalAmount: String,
  categoryName: String,
  icon: String,
  merchant: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Record', RecordSchema)