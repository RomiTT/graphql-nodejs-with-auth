const express = require('express')
const bodyParser = require('body-parser')
const { ApolloServer, gql } = require('apollo-server-express');
const jwt = require('express-jwt')
const fs = require('fs')
require('dotenv').config()

const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false
})

const typeDefs = gql(fs.readFileSync(__dirname+'/data/schema.gql', 'utf8'))
const resolvers = require('./data/resolvers')

const PORT = 3000

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