const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const { ApolloServer, gql } = require('apollo-server-express')
const { createServer } = require('http')
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



const validateToken = authToken => {
  // ... validate token and return a Promise, rejects in case of an error
};

const findUser = authToken => {
  return tokenValidationResult => {
    // ... finds user by auth token and return a Promise, rejects in case of an error
  };
};


async function main() {
  // create our express app
  const app = express()
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) =>  {
      if (req !== undefined) {
        return {user: req.user };
      }
    },
    playground: true,  
    introspection: true,  
    subscriptions: {
      onConnect: (connectionParams, webSocket) => {
        console.log("onConnect")
        // if (connectionParams.authToken) {
        //   return validateToken(connectionParams.authToken)
        //     .then(findUser(connectionParams.authToken))
        //     .then(user => {
        //       return {
        //         currentUser: user,
        //       };
        //     });
        // }
  
        // throw new Error('Missing auth token!');        
      },
    }
  });
  
  app.use(express.static('public'))
  app.use(bodyParser.json())
  app.use(compression())
  app.use(auth)

  app.use('/voyager', voyagerMiddleware.express({ endpointUrl: '/graphql' }))
  
  const path = process.env.API_PATH
  server.applyMiddleware({app, path})

  const ws = createServer(app)
  server.installSubscriptionHandlers(ws)

  ws.listen({ port: process.env.SERVICE_PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.SERVICE_PORT}${path}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${process.env.SERVICE_PORT}${path}`)
  });
}

main()

