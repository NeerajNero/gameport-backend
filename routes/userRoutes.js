const express = require('express')
const router = express.Router()
const {register, login, getUser} = require('../controllers/userController')
const checkToken = require('../middleware/checkToken')

router.post('/register', register)
router.post('/login', login)
router.get('/getUser', checkToken, getUser)
module.exports = router