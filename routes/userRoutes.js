const express = require('express')
const router = express.Router()
const {register, login, getUser, logout, getFullUserDetails} = require('../controllers/userController')
const checkToken = require('../middleware/checkToken')

router.post('/register', register)
router.post('/login', login)
router.get('/getUser', checkToken, getUser)
router.get('/logout',checkToken, logout)
router.get('/user', checkToken, getFullUserDetails)
module.exports = router