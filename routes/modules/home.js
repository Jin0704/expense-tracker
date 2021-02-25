const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')

router.get('/', (req, res) => {
  let totalAmount = 0
  const categorySelect = req.query.categorySelect
  console.log('req.query', categorySelect)
  if (!categorySelect || categorySelect === '全部') {
    Record.find()
      .lean()
      .sort({ date: 'asc' })
      .then(records => {
        for (let record of records) {
          totalAmount += record.amount
        }
        res.render('index', { records, totalAmount })
      })
      .catch(error => console.error(error))
  } else {
    Record.find({ category: `${categorySelect}` })
      .lean()
      .sort({ date: 'asc' })
      .then(records => {
        for (let record of records) {
          totalAmount += record.amount
        }
        res.render('index', { records, totalAmount, categorySelect })
      })
      .catch(error => console.log(error))
  }


})

module.exports = router