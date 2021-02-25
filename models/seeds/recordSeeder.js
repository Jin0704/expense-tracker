const Record = require('../Record')
const db = require('../../config/mongoose')

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