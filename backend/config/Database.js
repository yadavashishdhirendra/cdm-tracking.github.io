const mongoose = require('mongoose')

const connectToDatabase = () => {
    mongoose.connect(process.env.MONGOURL).then((data) => {
        console.log(`MongoDB connected with server: ${data.connection.host}`)
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = connectToDatabase;