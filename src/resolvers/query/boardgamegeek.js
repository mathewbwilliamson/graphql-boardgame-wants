const axios = require('axios');
const xmlToJson = require('xml-js');

module.exports = async (root, args) => await axios
  .get(`https://www.boardgamegeek.com/xmlapi/boardgame/${args.id}?&stats=1`)
  .then(response => {
    const boardgamesObj = JSON.parse(xmlToJson.xml2json(response.data, {compact: true, spaces: 4})).boardgames.boardgame;
    
    //filter name array to get primary="true"
    const nameFilter = boardgamesObj.name.filter( item => {
      if ('primary' in item._attributes) {
        return item;
      }
    });

    const boardgameMechanic = boardgamesObj.boardgamemechanic.map(item => {
      return item._text
    })

    const boardGameRatings = boardgamesObj.statistics.ratings;

    console.log(boardgamesObj.statistics.ratings)
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
    );