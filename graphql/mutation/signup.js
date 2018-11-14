const {User} = require('../../models')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()

// Resolver function signature:  fieldName(obj, args, context, info) { result }

function init(resolver, pubsub) {
  async function signup (_, {username, email, password}) {
    let user = await User.findOne({where: {email}})
  
    if (user) {
      throw new Error(`User '${user.email}' exists.`)
    }

    user = await User.create({
      username,
      email,
      password: await bcrypt.hash(password, 10)
    })
  
    // return json web  token
    return jsonwebtoken.sign(
      {id: user.id, email: user.email},
      process.env.JWT_SECRET,
      {expiresIn: '1y'}
    )
  }

  resolver.signup = signup
}

module.exports = init