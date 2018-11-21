const axios = require('axios');

module.exports = async (root, args) => await axios
  .get(`https://swapi.co/api/people/${args.id}`)
  .then(response => {
    console.log(response)
    return response.data});