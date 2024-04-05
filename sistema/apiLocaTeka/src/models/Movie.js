const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  actors: [{
    type: String,
    required: true,
  }],
  image: {
    type: String,
    required: true,
  },
  qtdDvds: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
