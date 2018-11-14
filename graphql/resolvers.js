var fs = require('fs');
const { PubSub } = require('apollo-server');

const pubsub = new PubSub();

const resolvers = {
  Query: {},
  Mutation: {},
  Subscription: {}
}

function loadResolvers(dir, resolver) {
  const files = fs.readdirSync(__dirname + dir);
  for (const i in files) {    
    const init = require('.' + dir + '/' + files[i]);
    init(resolver, pubsub)
  }
}

loadResolvers('/subscription', resolvers.Subscription)
loadResolvers('/query', resolvers.Query)
loadResolvers('/mutation', resolvers.Mutation)

module.exports = resolvers