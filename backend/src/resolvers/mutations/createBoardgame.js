'use strict';

const Boardgames = require('../../models/Boardgames');

module.exports = async (root, args) => {
  const boardgameObj = args;

  //need to add validation in here, if GraphQL doesn't catch it? 

  return await Boardgames
    .create(boardgameObj)
    .catch(err => {
      console.error(err)
    })
}