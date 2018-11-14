const {User} = require('../../models')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const { PubSub } = require('apollo-server');
require('dotenv').config()


// Resolver function signature:  fieldName(obj, args, context, info) { result }

const USER_LOGGINED = 'USER_LOGGINED';

function init(resolver, pubsub) {
  async function login (_, {email, password}) {
    const user = await User.findOne({where: {email}})
  
    if (!user) {
      throw new Error('No user with that mail.')
    }
  
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Incorrect password.')
    }
    
    pubsub.publish(USER_LOGGINED, {userLoggined: user})
    
    // return json web token
    return jsonwebtoken.sign(
      {id: user.id, email: user.email},
      process.env.JWT_SECRET,
      {expiresIn: '1d'}
    )
  } 

  resolver.login = login
}

module.exports = init