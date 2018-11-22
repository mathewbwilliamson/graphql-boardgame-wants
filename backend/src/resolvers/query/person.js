const axios = require('axios');
const User = require('../../models/User');

module.exports = async (root, args, context) => {
  const data = context.jwtVerification();
  const isUser = User.findOne({_id: data.user._id});

  if ( !isUser ) {
    throw('Unauthorized user')
  };

  await axios
  .get(`https://swapi.co/api/people/${args.id}`)
  .then(response => {
    console.log(response.data)
    return response.data
  })};