const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('Connected to Database!!')
        
    } catch (error) {
        console.log(error)
        throw new Error('Error at initialize database')
    }
}


module.exports = {
    dbConnection
}