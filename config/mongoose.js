const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/expense-tracker'
const mongoose = require('mongoose')  // 載入 mongooseconst Record = require('../models/Record')
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected')
})

module.exports = db