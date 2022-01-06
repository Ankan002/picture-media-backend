const {getProfile} = require('../Helpers/user')

const userResolvers = {
    Query: {
        userProfile: getProfile
    }
}

module.exports = userResolvers