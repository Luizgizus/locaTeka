const mongoose = require('mongoose');

const movieRentalSchema = new mongoose.Schema({
  idMovieBorowed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  idUserBorow: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isReturned: {
    type: Boolean,
    required: true,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('MovieRental', movieRentalSchema);
