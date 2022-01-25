// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 model
const Restaurant = require('../../models/restaurant')

// 定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// Search
router.get("/search", (req, res) => {
  if (!req.query.keywords) {
    res.redirect("/")
  }

  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()
  const sort = req.query.sort

  let sortKey = {}
  if (sort === 'A->Z') {
    sortKey = { name: 'asc' }
  } else if (sort === 'Z->A') {
    sortKey = { name: 'desc' }
  } else if (sort === '類別') {
    sortKey = { category: 'asc' }
  } else if (sort === '地區') {
    sortKey = { location: 'asc' }
  } else if (sort === '評分') {
    sortKey = { rating: 'desc' }
  }

  Restaurant.find()
    .lean()
    .sort(sortKey)
    .then(restaurants => {
      const filterRestaurant = restaurants.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )
      res.render("index", { restaurants: filterRestaurant, keywords })
    })
    .catch(err => console.log(err))
})

// 匯出路由模組
module.exports = router