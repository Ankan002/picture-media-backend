require('dotenv').config()
const cloudinary = require('cloudinary').v2
const Post = require('../models/Post')
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

exports.createPost = async(req, res) => {
    const {title, id} = req.body
    const file = req.files.photo
    const post = {
        user: id,
        title: title
    }
    cloudinary.uploader.upload(file.tempFilePath,(err, result) => {
        if(err){
            console.log(err)
            return res.status(400).json({
                success: false,
                message: 'Some Error Occurred'
            })
        }
        const {url} = result
        post.photo = url
    })
    .then(async() => {
        try{
            const newPost = await Post.create({
                user: post.user,
                photo: post.photo,
                title: post.title
            })
    
            newPost.success = true

            console.log(file.tempFilePath)

            fs.unlink(file.tempFilePath, err => console.log(err))
    
            res.status(200).json({
                success: true,
                post: newPost
            })
        }
        catch(error){
            console.log(error)
            res.status(400).json({
                success: false,
                message: 'Some Error Occurred'
            })
        }
    })
}

