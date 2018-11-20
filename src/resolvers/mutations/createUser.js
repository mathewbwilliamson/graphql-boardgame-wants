'use strict';

module.exports = (root, args) => {
  const {username, password} = args;
  return {
    userId: 1,
    username,
    password
  };
};