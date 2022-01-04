const User = require('../../models/User')
const Post = require('../../models/Post')

exports.getAllPosts = async() => {
    try{
        const posts = await Post.find().populate('user').exec()
        return{
            posts: posts.reverse(),
            success: true
        }
    }
    catch(error){
        console.error(error.message)
        return {
            success: false
        }
    }
}

exports.getPostsByUserId = async(parent, args, context, info) => {
    const userId = args.userId

    try{
        const posts = await Post.find({user: userId})

        return {
            posts: posts.reverse(),
            success: true
        }
    }
    catch(error){
        console.error(error.message)
        return {
            success: false
        }
    }
}