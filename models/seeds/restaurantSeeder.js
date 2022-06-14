const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')
const restaurantList = require('../../restaurant.json').results
const user = require('../user')
const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    restaurantId: [1, 2, 3]
  }, {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantId: [4, 5, 6]
  }]

db.once('open', () => {
  SEED_USER.forEach((user) => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => {
        User.create({
          name: user.name,
          email: user.email,
          password: hash
        }).then((userInDB) => {
          const seedRestaurant = []
          restaurantList.forEach((restaurant) => {
            if (user.restaurantId.includes(restaurant.id)) {
              restaurant["userId"] = userInDB._id
              seedRestaurant.push(restaurant)
            }
          })
          return Restaurant.create(seedRestaurant)
        }).then(() => {
          console.log('done.')
          process.exit()
        })
      })
  })
})