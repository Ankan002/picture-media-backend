const User = require('../../models/User')

exports.signIn = async(parent, args, context, info) => {
    const {name, username, email, providerId, image} = args.payload

    try{
        const user = await User.findOne({providerId})

        if(!user){
            const newUserObject = {
                name,
                username,
                email,
                providerId,
                image,
                githubProfile: args.payload.githubProfile ? args.payload.githubProfile : '',
                likes: 0
            }

            const newUser = await User.create(newUserObject)

            newUser.success = true

            return newUser
        }

        user.success = true
        return user
    }
    catch(error){
        console.error(error.message)
        return{
            success: false
        }
    }
}

exports.getUser = async (parent, args, context, info) => {
    const id = args.providerId

    try{
        if(id === undefined) return {success: false}
        
        const user = await User.findOne({providerId: id})

        if (!user) return {success: false}

        user.success = true

        return user
    }
    catch(error){
        console.error(error.message)
        return{
            success: false
        }
    }

}