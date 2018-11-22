'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const JWT_SECRET = '1234'

module.exports = async (root, args) => {
  const { username, password } = args;
  //Make sure the user is in the database already
  User
    .findOne({username})
    .then( user => {
      if (!user) {
        throw new Error('Invalid Username');
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        return jwt.sign({user}, JWT_SECRET);
      } else {
        throw new Error('Invalid credentials');
      }
      
    })
  
  //pull stored in DB hashedPassword then if they are equal...or bcrypt.compare? 
}