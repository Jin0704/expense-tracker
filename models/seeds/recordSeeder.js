const Record = require('../Record')
const db = require('../../config/mongoose')

const recordList = [
  {
    name: '早餐',
    category: '飲食',
    date: '2021-2-2',
    amount: 80,
  },
  {
    name: '交通月票',
    category: '交通',
    date: '2021-1-29',
    amount: 1280,
  },
  {
    name: 'PS5',
    category: '娛樂',
    date: '2021-1-1',
    amount: 18000,
  },
  {
    name: '電蚊拍',
    category: '生活',
    date: '2020-12-28',
    amount: 150,
  },
  {
    name: '投資',
    category: '其他',
    date: '2021-1-4',
    amount: 280000,
  }
]

db.once('open', () => {
  console.log('mongodb connected')
  recordList.forEach(record => Record.create(record))
  console.log('done')
})