const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// router.get('/new', (req, res) => {
//   return res.render('new')
// })
// router.post('/', (req, res) => {
//   const name = req.body.name
//   return Todo.create({ name })
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })
// router.get('/:id', (req, res) => {
//   const id = req.params.id
//   return Todo.findById(id)
//     .lean()
//     .then(todo => res.render('detail', { todo }))
//     .catch(error => console.log(error))
// })
// router.get('/:id/edit', (req, res) => {
//   const id = req.params.id
//   return Todo.findById(id)
//     .lean()
//     .then(todo => res.render('edit', { todo }))
//     .catch(error => console.log(error))
// })
// router.put('/:id', (req, res) => {
//   const id = req.params.id
//   const { name, isDone } = req.body
//   return Todo.findById(id)
//     .then(todo => {
//       todo.name = name
//       todo.isDone = isDone === 'on'
//       return todo.save()
//     })
//     .then(() => res.redirect(`/todos/${id}`))
//     .catch(error => console.log(error))
// })
// router.delete('/:id', (req, res) => {
//   const id = req.params.id
//   return Todo.findById(id)
//     .then(todo => todo.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

// Search
router.get("/search", (req, res) => {
  if (!req.query.keywords) {
    res.redirect("/")
  }

  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()

  Restaurant.find()
    .lean()
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

// Create
router.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

router.post('/restaurants', (req, res) => {
  const newRestaurant = req.body
  return Restaurant.create(newRestaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Read detail
router.get('/restaurants/:id', (req, res) => {
  const showId = req.params.id
  return Restaurant.findById(showId)
    .lean()
    .then((restaurants) => res.render('show', { restaurants }))
    .catch(error => console.log(error))
})

// Edit
router.get('/restaurants/:id/edit', (req, res) => {
  const editId = req.params.id
  return Restaurant.findById(editId)
    .lean()
    .then((restaurants) => res.render('edit', { restaurants }))
    .catch(error => console.log(error))
})

router.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const editRestaurant = req.body
  Restaurant.findByIdAndUpdate(id, editRestaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Delete
router.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurants => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router