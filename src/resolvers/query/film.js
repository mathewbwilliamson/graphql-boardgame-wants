const axios = require('axios');

module.exports = async (root, args) => await axios
  .get(`https://swapi.co/api/films/${args.id}`)
  .then(response => response.data);