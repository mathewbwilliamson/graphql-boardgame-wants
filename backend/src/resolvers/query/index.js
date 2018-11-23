'use strict';

const info = require('./info');
const packageName = require('./packageName');
const person = require('./person');
const people = require('./people');
const film = require('./film');
const getBoardgameFromBGG = require('./getBoardgameFromBGG');
const bgg_search = require('./bgg_search');
const bgg_search_and_get = require('./bgg_search_and_get');
const boardgamedbfind = require('./boardgamedbfind');
const bgg_get_search_data = require('./bgg_get_search_data');

module.exports = { 
  info, 
  packageName, 
  person, 
  film, 
  people, 
  getBoardgameFromBGG, 
  bgg_search,
  bgg_search_and_get,
  boardgamedbfind,
  bgg_get_search_data
};