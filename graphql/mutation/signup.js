const {User} = require('../../models')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()


// Resolver function signature:  fieldName(obj, args, context, info) { result }
module.exports = {
  async signup (_, {username, email, password}) {
    const user = await User.create({
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
}