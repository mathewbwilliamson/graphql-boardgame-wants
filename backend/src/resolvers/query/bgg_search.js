const axios = require('axios');
const xmlToJson = require('xml-js');

// This Query is redundant

function capitalizeString(str) {
  const strArray = str.toLowerCase().split(' ');
  const capStrArray = strArray.map( word => word[0].toUpperCase() + word.slice(1));
  return capStrArray.join(' ');
}

module.exports = async (root, args) => await axios
  .get(`https://boardgamegeek.com/xmlapi/search?search=${args.search}`)
  .then(response => {
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
    
    //rely on their search function returning the best thing
    return nameAndObjectIds[0];
  }
    );