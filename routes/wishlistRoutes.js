const express = require('express')
const router = express.Router()
const {addToWishlist, getWishlist, incFromWishlist, decFromWishlist, deleteFromWishlist} = require('../controllers/wishlistController')
const checkToken = require('../middleware/checkToken')

router.post('/addToWishlist', checkToken, addToWishlist)
router.get('/getWishlist', checkToken, getWishlist)
router.put('/incFromWishlist', checkToken, incFromWishlist)
router.put('/decFromWishlist', checkToken, decFromWishlist)
router.put('/deleteFromWishlist', checkToken, deleteFromWishlist)
module.exports = router