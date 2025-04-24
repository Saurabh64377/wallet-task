const mongoose = require('mongoose')

const connectDb = async()=>{

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to DATABASE')
        
    } catch (error) {
        console.log(err, 'not connected to DATABASE')
        process.exit(1)
        
    }

}

module.exports = connectDb;