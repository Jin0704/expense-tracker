const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RecordSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  category: {
    type: String,
    require: true
  },
  date: {
    type: String,
    require: true
  },
  amount: {
    type: Number,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    requires: true
  }
})

module.exports = mongoose.model('Record', RecordSchema)