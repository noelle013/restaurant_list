const express = require('express')
const router  = express.Router()

const Restaurant = require('../../models/restaurant')

// get all data
router.get('/', (req,res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

// Search
router.get('/search', (req, res) => {
  if (!req.query.keyword) {
    res.redirect('/')
  }
  const keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find({})
    .lean()
    .then(restaurants => {
      const filterRestaurants = restaurants.filter(data =>
        data.name.toLowerCase().includes(keyword) || data.category.includes(keyword)
      )
      res.render('index', { restaurant: filterRestaurants, keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router