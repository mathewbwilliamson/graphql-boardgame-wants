const axios = require('axios');
const xmlToJson = require('xml-js');
const User = require('../../models/User');

// This Query is redundant

function capitalizeString(str) {
  const strArray = str.toLowerCase().split(' ');
  const capStrArray = strArray.map( word => word[0].toUpperCase() + word.slice(1));
  return capStrArray.join(' ');
}

module.exports = async (root, args) => {
  if (!args.search) {
    return [];
  }
  return (await axios

  .get(`https://boardgamegeek.com/xmlapi/search?search=${args.search}`)
  .then(response => {
    
    const capitalizedSearch = capitalizeString(args.search);
    let boardgamesObj = JSON.parse(xmlToJson.xml2json(response.data, {compact: true, spaces: 4})).boardgames.boardgame;
    console.log('test', boardgamesObj.length)
  
    if (!boardgamesObj || boardgamesObj.length > 10 || boardgamesObj.length < 1) {
      return [];
    }
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

    // Array: [ {name: , objectId: } ]

    const arrayToObject = (array) =>
      array.reduce((obj, item) => {
        obj[item.objectId] = item
        return obj
      }, {})
    const nameAndObjectIdsObj = arrayToObject(nameAndObjectIds)

    console.log(nameAndObjectIdsObj)
    
    //rely on their search function returning the best thing
    return nameAndObjectIds;
  })
    )};