'use strict';

const User = require('../../models/User');
 
module.exports = async (root, args) => {
  const {username, password} = args;

  try {
    return await User.create({username, password});
  } catch(err) {
    console.log('/////////////////////////////////////////////////////////////////////')
    console.error(err)
  }
  
};
