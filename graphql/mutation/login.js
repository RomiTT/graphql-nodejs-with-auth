const {User} = require('../../models')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()


module.exports = {
  // Resolver function signature
  // fieldName(obj, args, context, info) { result }  
  async login (_, {email, password}) {
    const user = await User.findOne({where: {email}})
  
    if (!user) {
      throw new Error('No user with that mail.')
    }
  
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Incorrect password.')
    }
  
    // return json web token
    return jsonwebtoken.sign(
      {id: user.id, email: user.email},
      process.env.JWT_SECRET,
      {expiresIn: '1d'}
    )
  }
}