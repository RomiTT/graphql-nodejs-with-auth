const express = require('express')
const bodyParser = require('body-parser')
const { ApolloServer, gql } = require('apollo-server-express');
const jwt = require('express-jwt')
const fs = require('fs')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)
require('dotenv').config()

const PORT = 3000

const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false
})

async function main() {
  const typeDefs = gql(await readFile(__dirname+'/data/schema.gql', 'utf8'))
  const resolvers = require('./data/resolvers') 
  
  // create our express app
  const app = express()
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) =>  ({
      user: req.user
    })
  });
  
  app.use(bodyParser.json())
  app.use(auth)
  
  const path = '/graphql'
  server.applyMiddleware({app, path})
  
  app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}${path}`)
  })
}

main()

