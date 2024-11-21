const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
                unique: true
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            }
        }
    ]
},{timestamps: true})

const Wishlist = new mongoose.model('Wishlist', wishlistSchema)
module.exports = Wishlist