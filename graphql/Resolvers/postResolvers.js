const { getAllPosts, getPostsByUserId, deletePostById, likeOrDislikePost } = require('../Helpers/posts')

const postResolvers = {
    Query: {
        Posts: getAllPosts,
        userPosts: getPostsByUserId,
    },
    Mutation: {
        deletePost: deletePostById,
        likePost: likeOrDislikePost
    }
}

module.exports = postResolvers