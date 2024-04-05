const express = require('express');
const MovieRental = require('../models/MovieRental');

class MovieRentalRoute {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', this.listMovieRentals);
  }

  async listMovieRentals(req, res) {
    try {
      const movies = await MovieRental.find();
      res.send(movies);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async borowMovie(idMovieBorowed, idUserBorow) {
    try {
      const movie = await MovieRental.create({
        idMovieBorowed: idMovieBorowed,
        idUserBorow: idUserBorow
      });
      res.status(201).send(movie);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async returnMovie(idMovieBorowed, idUserBorow) {
    try {

      const movie = await MovieRental.findByIdAndUpdate(req.params.id, {isReturned:true}, { new: true })({
        idMovieBorowed: idMovieBorowed,
        idUserBorow: idUserBorow
      });

      res.status(200).send(movie);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = new MovieRentalRoute();