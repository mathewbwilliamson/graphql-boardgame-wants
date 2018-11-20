'use strict';

const mongoose = require('mongoose');
// const scheduledEventsSchema = require('./scheduled-events')
 

const userSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // scheduledEvents: [scheduledEventsSchema],
})

userSchema.set( 'toObject', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
    delete result.password;
  }
});

module.exports = mongoose.model('User', userSchema);