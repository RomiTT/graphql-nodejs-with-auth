const {User} = require('../models')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
var fs = require('fs');
const path = require('path');
require('dotenv').config()


function loadResolvers(dir, target) {
  const files = fs.readdirSync(__dirname + dir);
  for (const i in files) {
    const name = path.parse(files[i]).name;
    const m = require('.' + dir + '/' + files[i]);
    
    for(var propName in m) {
      target[propName] = m[propName]
    }
  }
}

const resolvers = {
  Query: {},
  Mutation: {}
}

loadResolvers('/query', resolvers.Query)
loadResolvers('/mutation', resolvers.Mutation)

module.exports = resolvers