const { gql } = require('apollo-server-express')

const postTypeDefs = gql`
    type Post{
        id: ID!
        photo: String!
        title: String!
        likes: Int!
        user: User!
        liked_users: [ID]!
    }

    type User{
        id: ID!
        name: String!
        username: String!
        email: String!
        providerId: ID!
        image: String!
        githubProfile: String!
        likes: Int!
    }

    type Posts{
        posts: [Post]
        success: Boolean!
    }

    type userPost{
        id: ID!
        user: ID!
        title: String!
        photo: String!
        likes: Int!
        liked_users: [ID]!
    }

    type userPosts{
        posts: [userPost]
        success: Boolean!
    }

    type Query{
        Posts: Posts
        userPosts(userId: ID!): userPosts
    }
`

module.exports = postTypeDefs