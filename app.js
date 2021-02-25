const express = require('express')
const exphbs = require('express-handlebars')
const app = express()


app.get('/', (req, res) => {
  res.send('Hello~~~')
})


app.listen(3000, () => {
  console.log('The web is running on http://localhost:3000')
})