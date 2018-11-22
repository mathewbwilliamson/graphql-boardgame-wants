'use strict';

const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose')
const { PORT, DATABASE_URL, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db/db-mongoose');

const typeDefs='./src/schema.graphql';
const Query = require('./resolvers/query');
const Mutation = require('./resolvers/mutations');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const resolvers= {
  Query,
  Mutation
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: incomingData => ({
    incomingData,
    jwtVerification: () => {
      const AuthHeader = incomingData.request.header('authorization');
      
      if (!AuthHeader) {
        throw('Unauthorized');
      }

      const token = AuthHeader.replace('Bearer', '');
      const decodedToken = jwt.verify(token, JWT_SECRET);
      console.log(decodedToken)
      return decodedToken;
    }
  })
})

if (require.main === module) {
  dbConnect();
  server.start(() => console.log('Server is running'));
}