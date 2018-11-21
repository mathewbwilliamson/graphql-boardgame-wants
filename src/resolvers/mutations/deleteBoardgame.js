'use strict';

const Boardgames = require('../../models/Boardgames');

module.exports = async (root, args) => {
  const {userId, objectId} = args;
  
  console.log(userId)

  return await Boardgames
    .findOneAndDelete({_id: objectId, userId})
    .catch(err => {
      console.error(err);
    })
}