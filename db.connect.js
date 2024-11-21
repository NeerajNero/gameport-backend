const mongoose = require('mongoose');
require('dotenv').config();

const initializeDatabase = async () => {
    const connection = await mongoose.connect(process.env.mongoURI)
    if(connection){
        console.log("connection successfull")
    }else{
        console.log("connection failed")
    }
}

module.exports = initializeDatabase;