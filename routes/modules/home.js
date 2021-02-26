const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')

function formatDate(date) {
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return y + '-' + m + '-' + d
}


router.get('/', (req, res) => {
  let totalAmount = 0
  const { categorySelect, monthSelected } = req.query
  const userId = req.user._id
  // if ((!categorySelect || categorySelect === '類別') && (!monthSelected || monthSelected === '月份')) {
  //   Record.find({ userId })
  //     .lean()
  //     .sort({ date: 'asc' })
  //     .then(records => {
  //       for (let record of records) {
  //         totalAmount += record.amount
  //         record.stringDate = formatDate(record.date)
  //       }
  //       res.render('index', { records, totalAmount })
  //     })
  //     .catch(error => console.error(error))
  // } else {
  //   Record.find({ category: `${categorySelect}`, userId })
  //     .lean()
  //     .sort({ date: 'asc' })
  //     .then(records => {
  //       for (let record of records) {
  //         totalAmount += record.amount
  //         record.stringDate = formatDate(record.date)
  //       }
  //       res.render('index', { records, totalAmount, categorySelect })
  //     })
  //     .catch(error => console.log(error))
  // }

  Record.find({ userId })
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      if (categorySelect && categorySelect !== '類別') {

        records = records.filter(item => item.category === categorySelect)

      }
      if (monthSelected && monthSelected !== '月份') {
        // expense = expense.filter(item => {
        //     (new Date(item.date).getMonth() + 1).toString() === monthSelected
        // })
        let record = []
        for (let i = 0; i < records.length; i++) {
          if ((new Date(records[i].date).getMonth() + 1).toString() === monthSelected) {
            record.push(records[i])
          }
          records = record

        }
      }
      return records
    })
    .then(records => {
      for (let record of records) {
        record.stringDate = formatDate(record.date)
        totalAmount += record.amount
      }

      res.render('index', { records, totalAmount, categorySelect, monthSelected })
    })
    .catch(error => console.error(error))

})

module.exports = router