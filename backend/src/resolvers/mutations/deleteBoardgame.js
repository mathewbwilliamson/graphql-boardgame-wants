'use strict';

const Boardgames = require('../../models/Boardgames');
const User = require('../../models/User')

module.exports = async (root, args, context) => {
  const {userId, objectId} = args;

  const data = context.jwtVerification();
  const isUser = User.findOne({_id: data.user._id});

  if (!isUser) {
    throw('Unauthorized User')
  }
  
  return await Boardgames
    .findOneAndDelete({_id: objectId, userId})
    .catch(err => {
      console.error(err);
    })
}