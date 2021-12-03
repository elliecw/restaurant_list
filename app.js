// require packages used in the project
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json')

mongoose.connect('mongodb://localhost/restaurant_list') // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  // past the restaurant data into 'index' partial template
  res.render('index', { restaurants: restaurants.results })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const restaurant = restaurants.results.filter(restaurant => {
    return restaurant.category.toLowerCase().includes(keyword) || restaurant.name.toLowerCase().includes(keyword)
  })
  res.render('index', { restaurants: restaurant, keyword: keyword })
})

app.get('/restaurants/:restaurants_id', (req, res) => {
  const restaurant = restaurants.results.find(restaurant => restaurant.id.toString() === req.params.restaurants_id)
  res.render('show', { restaurant: restaurant })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})