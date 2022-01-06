const {gql} = require('apollo-server-express')

const userTypeDefs = gql`
    type Profile{
        id: ID!
        name: String!
        username: String!
        email: String!
        providerId: ID!
        image: String!
        githubProfile: String!
        likes: Int!
    }

    type UserProfile{
        user: Profile
        success: Boolean!
    }

    type Query{
        userProfile(userId: ID!): UserProfile
    }
`

module.exports = userTypeDefs