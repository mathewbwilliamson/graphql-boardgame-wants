'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { JWT_SECRET } = require('../../config');
 
module.exports = async (root, args) => {
  const {username, password} = args;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({username, password: hashedPassword});
  return jwt.sign({user}, JWT_SECRET); 
};
