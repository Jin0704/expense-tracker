const express = require('express')
const exphbs = require('express-handlebars')

const mongoose = require('mongoose')  // 載入 mongoose
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected')
})

const app = express()


app.get('/', (req, res) => {
  res.send('Hello~~~')
})


app.listen(3000, () => {
  console.log('The web is running on http://localhost:3000')
})