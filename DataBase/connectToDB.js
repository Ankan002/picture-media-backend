const mongoose = require('mongoose')

const connectToDB = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected... to DataBase')
    })
    .catch((error) => {
        console.log(error)
    })
}

module.exports = connectToDB