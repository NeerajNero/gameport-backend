const express = require('express')
const app = express()
const initializeDatabase = require('./db.connect')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const checkToken = require('./middleware/checkToken')
const adminRoutes = require('./routes/adminRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const wishlistRoutes = require('./routes/wishlistRoutes')
const addressRoutes = require('./routes/addressRoutes')

initializeDatabase()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}
))
app.use(cookieParser())

app.get('/', (req,res) => {
    res.status(200).json({message: "hey there dev"})
})
app.use('/api', userRoutes)

app.get('/protected', checkToken, (req,res) => {
    res.status(200).json({message: "you have private access", user: req.user})
})

app.use('/admin', adminRoutes)

app.use('/fetch', productRoutes)

app.use('/cart', cartRoutes)

app.use('/wishlist', wishlistRoutes)

app.use('/address', addressRoutes)
app.listen(3000, () => {
    console.log("server is running on Port: 3000")
})