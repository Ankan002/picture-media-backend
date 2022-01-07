require('dotenv').config()
const User = require('../../models/User')
const Post = require('../../models/Post')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

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

exports.deletePostById = async(parent, args, context, info) => {
    const {postId, link} = args.post
    const cloudinaryPostPublicId = ((((link).split('/'))[((link).split('/')).length - 1]).split('.'))[0]
    
    try{
        await cloudinary.uploader.destroy(cloudinaryPostPublicId)
        const deletedPost = await Post.findByIdAndDelete(postId)
        
        return{
            postId: deletedPost.id,
            success: true
        }
    }
    catch(error){
        console.error(error.message)
        return {
            message: 'Internal Server Error',
            success: false
        }
    }
}

exports.likeOrDislikePost = async(parent, args, context, info)  => {
    const {postId, userId, user} = args.payload

    try{
        const post = await Post.findById(postId)
        const currentUser = await User.findById(user)

        if((post?.liked_users).includes(userId)){
            const newLikedUsers = (post?.liked_users).filter((user) => {user !== userId})
            post.liked_users = newLikedUsers
            post.likes = post?.likes - 1
            currentUser.likes =  currentUser?.likes - 1
            const updatedPost = await Post.findByIdAndUpdate(postId, {$set: post}, {new: true})
            await User.findByIdAndUpdate(user, {$set: currentUser}, {new: true})
            return{
                post: updatedPost,
                success: true
            }
        }

        post.liked_users = (post.liked_users).push(userId)
        post.likes = post?.likes + 1
        currentUser.likes =  currentUser?.likes + 1
        const updatedPost = await Post.findByIdAndUpdate(postId, {$set: post}, {new: true})
        await User.findByIdAndUpdate(user, {$set: currentUser}, {new: true})
        console.log(updatedPost)
        return{
            post: updatedPost,
            success: true
        }
    }
    catch(error){
        console.error(error.message)
        return{
            message: 'Internal Server Error',
            success: false
        }
    }
}