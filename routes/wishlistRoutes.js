const express = require('express')
const router = express.Router()
const {addToWishlist} = require('../controllers/wishlistController')
const checkToken = require('../middleware/checkToken')

router.post('/addToWishlist', checkToken, addToWishlist)

module.exports = router