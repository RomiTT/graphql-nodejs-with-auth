const {User} = require('../../models')


// Resolver function signature:  fieldName(obj, args, context, info) { result }
module.exports = {
  async me (_, args, {user}) {
    // make sure user is logged in
    if (!user) {
      throw new Error('You are not authenticated!')
    }
  
    // user is authenticated
    return await User.findById(user.id)  
  },

  async test(_, args, {user}) {
    // make sure user is logged in
    if (!user) {
      throw new Error('You are not authenticated!')
    }
  
    // user is authenticated
    return await User.findById(user.id)  
  }
}