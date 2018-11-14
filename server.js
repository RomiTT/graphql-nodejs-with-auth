const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const { ApolloServer, gql } = require('apollo-server-express')
const expressPlayground = require('graphql-playground-middleware-express')
const voyagerMiddleware  = require('graphql-voyager/middleware')
const jwt = require('express-jwt')
const fs = require('fs')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)
require('dotenv').config()

const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers') 

const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false
})

async function main() {  
  // create our express app
  const app = express()
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) =>  ({
      user: req.user
    })
  });
  
  app.use(express.static('public'))
  app.use(bodyParser.json())
  app.use(compression())
  app.use(auth)

  app.get('/playground', expressPlayground.default({ endpoint: '/graphql' }))
  app.use('/voyager', voyagerMiddleware.express({ endpointUrl: '/graphql' }));
  
  const path = process.env.API_PATH
  server.applyMiddleware({app, path})
  
  app.listen(process.env.SERVICE_PORT, () => {
    console.log(`The server is running on http://localhost:${process.env.SERVICE_PORT}${path}`)
  })
}

main()

