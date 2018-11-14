
// Resolver function signature:  fieldName(obj, args, context, info) { result }

const USER_LOGGINED = 'USER_LOGGINED';

function init(resolver, pubsub) {
  resolver.userLoggined = {
    subscribe: () => {
      return pubsub.asyncIterator([USER_LOGGINED])
    },
  }
}

module.exports = init
