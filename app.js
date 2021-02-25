const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Record = require('./models/Record')
require('./config/mongoose')
// const mongoose = require('mongoose')  // 載入 mongoose
// const Record = require('./models/Record')
// mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB
// const db = mongoose.connection

// db.on('error', () => {
//   console.log('mongodb error!')
// })

// db.once('open', () => {
//   console.log('mongodb connected')
// })

const routes = require('./routes')
const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(3000, () => {
  console.log('The web is running on http://localhost:3000')
})