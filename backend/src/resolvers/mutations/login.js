'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { JWT_SECRET } = require('../../config');

module.exports = async (root, args) => {
  const { username, password } = args;
  //Make sure the user is in the database already
  const user = await User.findOne({username});

  if (!user) {
    throw new Error('Invalid Username');
  }
  
  const isValid = await bcrypt.compare(password, user.password);
  
  if (!isValid) {
    throw new Error('Invalid credentials');
  }
  
  return jwt.sign({user}, JWT_SECRET);  
  
};