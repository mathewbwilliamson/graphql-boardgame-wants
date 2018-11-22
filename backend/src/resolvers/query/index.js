'use strict';

const info = require('./info');
const packageName = require('./packageName');
const person = require('./person');
const people = require('./people');
const film = require('./film');
const boardgamegeek = require('./boardgamegeek');
const bgg_search = require('./bgg_search');
const bgg_search_and_get = require('./bgg_search_and_get');
const boardgamedbfind = require('./boardgamedbfind');

module.exports = { 
  info, 
  packageName, 
  person, 
  film, 
  people, 
  boardgamegeek, 
  bgg_search,
  bgg_search_and_get,
  boardgamedbfind
};