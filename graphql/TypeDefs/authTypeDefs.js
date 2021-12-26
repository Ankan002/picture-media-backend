const {gql} = require('apollo-server-express')

const authTypeDefs = gql`
    input AuthInput{
        name: String!
        username: String!
        email: String!
        providerId: ID!
        image: String!
        githubProfile: String
    }

    type Query{
        profile(providerId: ID!): Profile
    }

    type Profile{
        success: Boolean
        id: ID!
        name: String!
        username: String!
        email: String!
        providerId: ID!
        image: String!
        githubProfile: String!
        likes: Int!
    }

    type ProfileLogin{
        success: Boolean
        id: ID!
        name: String!
        username: String!
        email: String!
        providerId: ID!
        image: String!
        githubProfile: String!
        likes: Int!
    }
    
    type Mutation{
        signIn(payload: AuthInput): Profile
    }
`

module.exports = authTypeDefs