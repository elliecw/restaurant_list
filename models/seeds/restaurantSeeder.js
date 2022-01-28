// const mongoose = require('mongoose')
// const Restaurant = require('../restaurant')
// const restaurantList = require('../../restaurant.json').results
// const db = require('../../config/mongoose')

// db.once('open', () => {
//   Restaurant.create(restaurantList)
//     .then(() => console.log('restaurantSeeder success'))
//     .catch(error => console.log(error))
// })

const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')
const SEED_USER = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}
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
        { length: 10 },
        (_, i) => Todo.create({ name: `name-${i}`, userId })
      ))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})