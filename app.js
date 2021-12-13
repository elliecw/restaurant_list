const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const Restaurant = require('./models/restaurant')

const routes = require('./routes')

// 引入 home 模組程式碼
const home = require('./modules/home')
// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/', home)

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(routes)

// // get 全部餐廳資料
// app.get('/', (req, res) => {
//   Restaurant.find()
//     .lean()
//     .then(restaurants => res.render('index', { restaurants }))
//     .catch(error => console.log(error))
// })

// // Search
// app.get("/search", (req, res) => {
//   if (!req.query.keywords) {
//     res.redirect("/")
//   }

//   const keywords = req.query.keywords
//   const keyword = req.query.keywords.trim().toLowerCase()

//   Restaurant.find()
//     .lean()
//     .then(restaurants => {
//       const filterRestaurant = restaurants.filter(
//         data =>
//           data.name.toLowerCase().includes(keyword) ||
//           data.category.includes(keyword)
//       )
//       res.render("index", { restaurants: filterRestaurant, keywords })
//     })
//     .catch(err => console.log(err))
// })

// // Create
// app.get('/restaurants/new', (req, res) => {
//   return res.render('new')
// })

// app.post('/restaurants', (req, res) => {
//   const newRestaurant = req.body
//   return Restaurant.create(newRestaurant)
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// // Read detail
// app.get('/restaurants/:id', (req, res) => {
//   const showId = req.params.id
//   return Restaurant.findById(showId)
//     .lean()
//     .then((restaurants) => res.render('show', { restaurants }))
//     .catch(error => console.log(error))
// })

// // Edit
// app.get('/restaurants/:id/edit', (req, res) => {
//   const editId = req.params.id
//   return Restaurant.findById(editId)
//     .lean()
//     .then((restaurants) => res.render('edit', { restaurants }))
//     .catch(error => console.log(error))
// })

// app.put('/restaurants/:id', (req, res) => {
//   const id = req.params.id
//   const editRestaurant = req.body
//   Restaurant.findByIdAndUpdate(id, editRestaurant)
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// // Delete
// app.delete('/restaurants/:id', (req, res) => {
//   const id = req.params.id
//   return Restaurant.findById(id)
//     .then(restaurants => restaurants.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})