'use strict';

const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose')
const { PORT, DATABASE_URL, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db/db-mongoose');


const typeDefs='./src/schema.graphql';
const Query = require('./resolvers/query');
const Mutation = require('./resolvers/mutations');

const resolvers= {
  Query,
  Mutation
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

if (require.main === module) {
  dbConnect();
  server.start(() => console.log('Server is running'));
}