const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  req.body.userId = req.user._id
  return Record.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findById({ _id, userId })
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, category, amount } = req.body
  return Record.findById({ _id, userId })
    .then(record => {
      // record.name = name
      // record.category = category
      // record.amount = amount
      record = Object.assign(record, req.body) //專業一點的寫法
      return record.save()
    })
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findById({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})





module.exports = router