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

    type DeletedPost{
        message: String,
        postId: ID,
        success: Boolean!
    }

    input PostInput{
        postId: ID!
        link: String!
    }

    input LikeInput{
        postId: ID!
        userId: ID!
        user: ID!
    }

    type LikeResponse{
        message: String
        post: userPost
        success: Boolean!
    }

    type Mutation{
        deletePost(post: PostInput!): DeletedPost
        likePost(payload: LikeInput!): LikeResponse
    }
`

module.exports = postTypeDefs