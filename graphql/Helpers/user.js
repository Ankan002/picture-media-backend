const User = require('../../models/User')

exports.getProfile = async(parent, args, context, info) => {
    const id = args.userId
    console.log(id)

    try{
        if(id === undefined) return {success: false}
        
        const user = await User.findById(id)

        if (!user) return {success: false}

        return {
            user: user,
            success: true
        }
    }
    catch(error){
        console.error(error.message)
        return{
            success: false
        }
    }
}