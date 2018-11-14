const {User} = require('../../models')

// Resolver function signature:  fieldName(obj, args, context, info) { result }

function init(resolver, pubsub) {  
  async function me (_, args, {user}) {
    // make sure user is logged in
    if (!user) {
      throw new Error('You are not authenticated!')
    }
  
    // user is authenticated
    return await User.findById(user.id)  
  }

  async function test(_, args, {user}) {
    // make sure user is logged in
    if (!user) {
      throw new Error('You are not authenticated!')
    }
  
    // user is authenticated
    return await User.findById(user.id)  
  }

  resolver.me = me
  resolver.test = test
}

module.exports = init