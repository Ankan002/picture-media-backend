const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const postSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    photo: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        max: 50
    },
    likes: {
        type: Number,
        default: 0
    },
    liked_users: {
        type: [ObjectId],
        ref: 'User',
        default: []
    }

}, {timestamps: true})

module.exports = mongoose.model('Post', postSchema)