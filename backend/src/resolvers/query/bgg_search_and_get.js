const axios = require('axios');
const xmlToJson = require('xml-js');
const User = require('../../models/User');

// This Query starts with a search term
//   then fetches the objectId and name for that SearchTerm's top result using a BGG API endpoint
//   then goes to another BGG API endpoint to get the data on the previous result's objectId
//   It stores all of that in the schema so you can access data on the game

// Note: I did it this way after having the two queries split apart. Later on, I can figure out I am
//  actually going to run the query

/*
Sample Query
query GetResults($search: String!){
  search:bgg_search_and_get(search:$search) {
    name
    minPlayers
    yearPublished
    image
  }
}

Query Variables:
{
  "search": "pandemic"
}
*/

function capitalizeString(str) {
  const strArray = str.toLowerCase().split(' ');
  const capStrArray = strArray.map( word => word[0].toUpperCase() + word.slice(1));
  return capStrArray.join(' ');
}

module.exports = async (root, args, context) => {
  // const data = context.jwtVerification();
  // const isUser = User.findOne({_id: data.user._id});

  // if (!isUser) {
  //   throw('Unauthorized User');
  // };

  return await axios
  .get(`https://boardgamegeek.com/xmlapi/search?search=${args.search}`)
  .then(response => {
    console.log(response)
    if (!response) {return}
    const capitalizedSearch = capitalizeString(args.search);
    let boardgamesObj = JSON.parse(xmlToJson.xml2json(response.data, {compact: true, spaces: 4})).boardgames.boardgame;
    
    // If there's only one item returned with a search, above returns an object so we have to convert to array
    if (!Array.isArray(boardgamesObj)) {
      boardgamesObj = [boardgamesObj];
    }
    //Get an array of objects that include the name and objectId
    const nameAndObjectIds = boardgamesObj.map(item => { 
      return {name: item.name._text, 
        objectId: item._attributes.objectid
      }
    })
    console.log(nameAndObjectIds[0])
    //rely on their search function returning the best thing
    return nameAndObjectIds;
  })
  .then(response => {
    console.log(response)
    return axios.get(`https://www.boardgamegeek.com/xmlapi/boardgame/${response[0].objectId}?&stats=1`)
  })
  .then(response => {
    // console.log( '/////////////////////////////', response.data)
    if (!response) {return {
      name: null,
      objectId: null,
      description: null,
      minPlayers: null,
      maxPlayers: null,
      playingTime: null,
      yearPublished: null,
      image: null,
      thumbnail: null,
      boardgameMechanic: null,
      usersRated: null,
      averageRating: null,
      rankings: null,
      numOfWeights: null,
      averageWeight: null,
      bggLink: null
    }}
    const boardgamesObj = JSON.parse(xmlToJson.xml2json(response.data, {compact: true, spaces: 4})).boardgames.boardgame;
    
    //filter name array to get primary="true" which returns the main name of game
    const nameFilter = boardgamesObj.name.filter( item => {
      if ('primary' in item._attributes) {
        return item;
      }
    });

    //Creates an array of all the boardgame mechanics used in the game
    const boardgameMechanic = boardgamesObj.boardgamemechanic.map(item => {
      return item._text
    })

    const boardGameRatings = boardgamesObj.statistics.ratings;

    // console.log(boardgamesObj.statistics.ratings)
    const boardGameRanks = boardGameRatings.ranks.rank;

    const obj = {
      name: nameFilter[0]._text,
      objectId: boardgamesObj._attributes.objectid,
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
    // console.log(obj)
    return obj;
  }
)}