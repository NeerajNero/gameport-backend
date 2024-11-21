const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    images: [
        {
            type: String,
            require: true
        }
    ],
    platform: {
        type: String,
        required: true,
        enum: ["XBOXSX","PS5","PS4","XBOXONE"]
    },
    condition: {
        type: String,
        required: true,
        enum: ["NEW", "PRE-OWNED"]
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    genre: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    reviews: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            rating: {
                type: Number,
                min: 1,
                max: 5
            },
            comment: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    createdAt: { 
        type: Date, default: Date.now 
    },
    updatedAt: {
         type: Date, default: Date.now 
    },
},{timestamps:true})

const Product = new mongoose.model('Product', productSchema);
module.exports = Product;