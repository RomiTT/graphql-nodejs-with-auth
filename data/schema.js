const {makeExecutableSchema} = require('graphql-tools')
const {importSchema} = require('graphql-import')
const path = require('path');
const fs = require('fs')


// Define our schema using the GraphQL schema language
const typeDefs = fs.readFileSync(__dirname+'/schema.gql', 'utf8')
//const typeDefs = importSchema('schema.gql')
const resolvers = require('./resolvers')
console.log(resolvers)
var result = makeExecutableSchema({typeDefs, resolvers})
console.log(result)

module.exports = makeExecutableSchema({typeDefs, resolvers})