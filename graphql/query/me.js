const {User} = require('../../models')

module.exports = {
  // Resolver function signature
  // fieldName(obj, args, context, info) { result }
  async me (_, args, {user}) {
    // make sure user is logged in
    if (!user) {
      throw new Error('You are not authenticated!')
    }
  
    // user is authenticated
    return await User.findById(user.id)  
  }
}