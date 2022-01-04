const { getAllPosts, getPostsByUserId } = require('../Helpers/posts')

const postResolvers = {
    Query: {
        Posts: getAllPosts,
        userPosts: getPostsByUserId
    }
}

module.exports = postResolvers