'use strict';

const Boardgames = require('../../models/Boardgames');
const User = require('../../models/User')

module.exports = async (root, args, context) => {
  const data = context.jwtVerification();
  const isUser = User.findOne({_id: data.user._id});

  if (!isUser) {
    throw('Unauthorized User');
  }
  
  const boardgameObj = args;

  //need to add validation in here, if GraphQL doesn't catch it? 

  return await Boardgames
    .create(boardgameObj)
    .catch(err => {
      console.error(err)
    })
}