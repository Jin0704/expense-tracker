const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const User = require('../User')
const Record = require('../Record')
const db = require('../../config/mongoose')

const SEED_USER = {
  name: 'test',
  email: 'test@example.com',
  password: '12345678'
}

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
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: recordList.length }, (_, i) =>
        Record.create({ ...recordList[i], userId }))
      )
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
    .catch(error => console.warn('error', error))
})