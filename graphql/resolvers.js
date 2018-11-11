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
    const q = require('.' + dir + '/' + files[i]);
    target[name] = q[name];
  }
}

// Resolver function signature
// fieldName(obj, args, context, info) { result }
const resolvers = {
  Query: {},
  Mutation: {}
}

loadResolvers('/query', resolvers.Query)
loadResolvers('/mutation', resolvers.Mutation)

module.exports = resolvers