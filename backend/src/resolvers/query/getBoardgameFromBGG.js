const axios = require('axios');
const xmlToJson = require('xml-js');

// This query is redundant

module.exports = async (root, args) => {
  console.log('These are the args', args)
  return await axios
  .get(`https://www.boardgamegeek.com/xmlapi/boardgame/${args.id}?&stats=1`)
  .then(response => {
    const boardgamesObj = JSON.parse(xmlToJson.xml2json(response.data, {compact: true, spaces: 4})).boardgames.boardgame;

    //filter name array to get primary="true"
    if (!Array.isArray(boardgamesObj.name)) {
      boardgamesObj.name = [ boardgamesObj.name ];
    }
    
    const nameFilter = boardgamesObj.name.filter( item => {
      if ('primary' in item._attributes) {
        return item;
      }
    });     

    console.log('//////////ERROR BOARDGAMEMECHANIC', boardgamesObj.boardgamemechanic)
    if (boardgamesObj.boardgamemechanic && Array.isArray(boardgamesObj.boardgamemechanic)) {
      const boardgameMechanic = boardgamesObj.boardgamemechanic.map(item => {
        return item._text
      })
    } else {
      const boardgameMechanic = [];
    }

    const boardgameMechanic = boardgamesObj.boardgamemechanic.map(item => {
      return item._text
    })
    console.log(boardgameMechanic)
    
    const boardGameRatings = boardgamesObj.statistics.ratings;

    const boardGameRanks = boardGameRatings.ranks.rank;

    const obj = {
      name: nameFilter[0]._text,
      description: boardgamesObj.description._text,
      minPlayers: boardgamesObj.minplayers._text,
      maxPlayers: boardgamesObj.maxplayers._text,
      playingTime: boardgamesObj.playingtime._text,
      yearPublished: boardgamesObj.yearpublished._text,
      image: boardgamesObj.image._text,
      thumbnail: boardgamesObj.thumbnail._text,
      boardgameMechanic: boardgameMechanic,
      usersRated: boardGameRatings.usersrated._text,
      averageRating: boardGameRatings.average._text,
      rankings: boardGameRanks,
      numOfWeights: boardGameRatings.numweights._text,
      averageWeight: boardGameRatings.averageweight._text,
      bggLink: `https://boardgamegeek.com/boardgame/${args.id}`
    }
    return obj;
    
  }
)};