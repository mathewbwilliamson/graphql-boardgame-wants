const axios = require('axios');

module.exports = async (root, args) => await axios
  .get(`https://swapi.co/api/people`)
  .then(response => {
    console.log(response.data)
    return response.data.results});