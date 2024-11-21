const express = require('express')
const router = express.Router()
const {addToWishlist, getWishlist} = require('../controllers/wishlistController')
const checkToken = require('../middleware/checkToken')

router.post('/addToWishlist', checkToken, addToWishlist)
router.get('/getWishlist', checkToken, getWishlist)

module.exports = router