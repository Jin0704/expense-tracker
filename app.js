const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')  // 載入 mongoose
const Record = require('./models/Record')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected')
})

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(error => console.error(error))
})

app.get('/records/new', (req, res) => {
  res.render('new')
})

app.post('/records', (req, res) => {
  const name = req.body.name
  return Record.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('detail', { record }))
    .catch(error => console.log(eroor))
})

app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

app.post('/records/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return Record.findById(id)
    .then(record => {
      record.name = name
      return record.save()
    })
    .then(() => res.redirect(`/records/${id}`))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('The web is running on http://localhost:3000')
})