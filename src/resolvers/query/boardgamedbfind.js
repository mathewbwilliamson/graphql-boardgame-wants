const Boardgames = require('../../models/Boardgames');

module.exports = async (root, args) => {
  console.log(args)
  let filter = { userId: args.userId };

  
  return await Boardgames
    .find(filter)
    .sort({ updatedAt: 'desc' })
    .then(response => {
      console.log(response)
      return response
    })
    .catch(err => {
      console.error('This is an error in boardgamedbfind', err)
    })
  
}
