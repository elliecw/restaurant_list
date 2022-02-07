const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')
const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    restaurantId: [0, 1, 2]
  }, {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantId: [3, 4, 5]
  }]

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
      const seedRestaurant = []
      SEED_USER.restaurantId.forEach(index => {
        restaurantList[index].userId = user._id
        seedRestaurant.push(restaurantList[index])
      })
      return Restaurant.create(seedRestaurant)
    })
})
  .then(() => {
    console.log('done.')
    process.exit()
  })