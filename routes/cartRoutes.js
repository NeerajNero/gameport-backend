const express = require('express')
const router = express.Router()
const checkToken = require('../middleware/checkToken')
const {addToCart, decFromCart, incFromCart, deleteProduct, getCart, } = require('../controllers/cartController')

router.post('/addToCart', checkToken, addToCart)
router.put('/decFromCart', checkToken, decFromCart)
router.put('/incFromCart', checkToken, incFromCart)
router.put('/deleteFromCart', checkToken, deleteProduct)
router.get('/cartItems', checkToken, getCart)
module.exports = router