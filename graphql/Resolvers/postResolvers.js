const { getAllPosts, getPostsByUserId, deletePostById } = require('../Helpers/posts')

const postResolvers = {
    Query: {
        Posts: getAllPosts,
        userPosts: getPostsByUserId,
    },
    Mutation: {
        deletePost: deletePostById
    }
}

module.exports = postResolvers