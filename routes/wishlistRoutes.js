const express = require('express')
const router = express.Router()
const {addToWishlist, getWishlist, incFromWishlist} = require('../controllers/wishlistController')
const checkToken = require('../middleware/checkToken')

router.post('/addToWishlist', checkToken, addToWishlist)
router.get('/getWishlist', checkToken, getWishlist)
router.put('/incFromWishlist', checkToken, incFromWishlist)
module.exports = router