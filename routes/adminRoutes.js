const express = require('express')
const router = express.Router()
const {addProduct, deleteProduct, updateProducts} = require('../controllers/productController')
const checkAdmin = require('../middleware/checkAdmin')
const checkToken = require('../middleware/checkToken')

router.post('/addProduct',checkToken, checkAdmin, addProduct)
router.delete('/deleteProduct', checkToken, checkAdmin, deleteProduct)
router.put('/updateProduct/:id',checkToken, checkAdmin, updateProducts)
router.get('/test', checkToken, checkAdmin, (req,res) => {
    res.status(200).json({message: "hey there admin WELCOME"})
})

module.exports = router