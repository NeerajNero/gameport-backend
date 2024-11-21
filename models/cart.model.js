const mongoose  = require('mongoose')

const cartSchema = new mongoose.Schema({
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
            required: true
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1
        }
    }
        
    ]
},{timestamps: true})

const Cart = new mongoose.model('Cart', cartSchema)
module.exports = Cart