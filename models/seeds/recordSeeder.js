const mongoose = require('mongoose')  // 載入 mongoose
const Record = require('../Record')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected')
  for (let i = 0; i < 10; i++) {
    Record.create({
      name: 'name-' + i,
      category: '其它',
      amount: Math.floor(Math.random() * 100) + 1,
    })
  }
  console.log('done')
})