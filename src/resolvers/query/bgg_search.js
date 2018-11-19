const axios = require('axios');
const xmlToJson = require('xml-js');

module.exports = async (root, args) => await axios
  .get(`https://boardgamegeek.com/xmlapi/search?search=${args.search}`)
  .then(response => {
    const boardgamesObj = JSON.parse(xmlToJson.xml2json(response.data, {compact: true, spaces: 4})).boardgames.boardgame;
    const nameAndObjectIds = boardgamesObj.map
    console.log(boardgamesObj)
    console.log(nameAndObjectIds)

    const obj = {
      
    }

    return obj;
  }
    );