const {signIn, getUser} = require('../Helpers/auth')

const authResolvers = {
    Query:{
        profile: getUser
    },

    Mutation:{
        signIn: signIn
    }
}

module.exports = authResolvers