const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')

router.get('/', (req, res) => {
  let totalAmount = 0
  const { categorySelect, monthSelected } = req.query
  const userId = req.user._id
  if ((!categorySelect || categorySelect === '類別') && (!monthSelected || monthSelected === '月份')) {
    Record.find({ userId })
      .lean()
      .sort({ date: 'asc' })
      .then(records => {
        for (let record of records) {
          totalAmount += record.amount
          record.stringDate = formatDate(record.date)
        }
        res.render('index', { records, totalAmount })
      })
      .catch(error => console.error(error))
  } else {
    Record.find({ category: `${categorySelect}`, userId })
      .lean()
      .sort({ date: 'asc' })
      .then(records => {
        for (let record of records) {
          totalAmount += record.amount
          record.stringDate = formatDate(record.date)
        }
        res.render('index', { records, totalAmount, categorySelect })
      })
      .catch(error => console.log(error))
  }


})

module.exports = router