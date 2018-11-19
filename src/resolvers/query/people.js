const axios = require('axios');

module.exports = async (root, args) => await axios
  .get(`https://swapi.co/api/people`)
  .then(response => response.data.results);