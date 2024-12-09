const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
        unique: true
    },
    addresses: [{
       address: {type: String,
        require: true}
    }]
})

const Address = new mongoose.model('addressSchema', addressSchema)
module.exports = Address