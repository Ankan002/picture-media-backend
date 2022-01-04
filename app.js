require('dotenv').config()
const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const connectToDB = require('./DataBase/connectToDB')
const fileUpload = require('express-fileupload')
const authTypeDefs = require('./graphql/TypeDefs/authTypeDefs.js')
const authResolvers = require('./graphql/Resolvers/authResolvers')
const postRoute = require('./routes/post')
const postTypeDefs = require('./graphql/TypeDefs/postTypeDefs')
const postResolvers = require('./graphql/Resolvers/postResolvers')
const cors = require('cors')

const startServer = async () => {
    const app = express()
    const PORT = process.env.PORT

    connectToDB()

    app.use(cors())
    app.use(express.json())
    app.use(fileUpload({
        useTempFiles: true
    }))

    const apolloServer = new ApolloServer({
        typeDefs: [authTypeDefs, postTypeDefs],
        resolvers: [authResolvers, postResolvers]
    })

    await apolloServer.start()

    apolloServer.applyMiddleware({app: app})

    app.get('/', (req, res) => {
        res.json('Hello World')
    })

    app.use('/api', postRoute)

    app.listen(PORT, () => console.log(`App Running at ${PORT}`))
}

module.exports = startServer