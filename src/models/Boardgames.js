'use strict';

const mongoose = require('mongoose');

const boardgameSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  bggLink: { type: String, required: true },
  description: { type: String },
  minPlayers: { type: Number },
  maxPlayers: { type: Number },
  playingTime: { type: Number },
  yearPublished: { type: Number },
  image: { type: String },
  thumbnail: { type: String },
  usersRated: { type: Number },
  averageRating: { type: mongoose.Schema.Types.Decimal128 },
  rankings: { type: Array },
  numOfWeights: { type: Number },
  averageWeight: { type: mongoose.Schema.Types.Decimal128 },
  boardgameMechanic: { type: Array },
});



boardgameSchema.index({ name: 1, bggLink: 1, userId: 1}, { unique: true });

// Add `createdAt` and `updatedAt` fields
boardgameSchema.set('timestamps', true);

boardgameSchema.set( 'toObject', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model('Boardgame', boardgameSchema);