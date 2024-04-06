const express = require('express');
const MovieRental = require('../models/MovieRental');
const Movie = require('../models/Movie');
const User = require('../models/User');

class MovieRentalRoute {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/:idUser', this.listMovieRentals);
    this.router.get('/borrow/:idUser/:idMovie', this.borrowMovie);
    this.router.get('/return-borrow/:idBorrow', this.returnBorrowMovie);
  }

  async listMovieRentals(req, res) {
    try {
      const movieRentals = await MovieRental.find({ 'idUserBorow': req.params.idUser }).sort({ isReturned: 1, createdAt: -1})

      res.send(movieRentals);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async borrowMovie(req, res) {
    try {
      const movie = await Movie.findById(req.params.idMovie);
      const user = await User.findById(req.params.idUser);
      let movieBorrow = {}
      if (!movie) {
        return res.status(404).send({ message: 'Filme não encontrado!' });
      }
  
      if(movie.qtdDvds > 0){
        await Movie.findByIdAndUpdate(req.params.idMovie, { $inc: { qtdDvds: -1 } }, { new: true });
        movieBorrow = await MovieRental.create({idMovieBorowed: req.params.idMovie, nameMovieBorowed: movie.name, idUserBorow: req.params.idUser});
      }

      res.send(movieBorrow);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async returnBorrowMovie(req, res) {
    try {
      const movieRental = await MovieRental.findById(req.params.idBorrow);

      if(!movieRental || movieRental.isReturned){
        return res.status(404).send({ message: 'Emprestimo não encontrado!' });
      }
  
      const movie = await Movie.findByIdAndUpdate(movieRental.idMovieBorowed, { $inc: { qtdDvds: 1 } }, { new: true });
      await MovieRental.findByIdAndUpdate(req.params.idBorrow, {isReturned:true}, { new: true });
      res.send(movie);
    } catch (error) {
      console.log(error)
      res.status(400).send(error);
    }
  }
}

module.exports = new MovieRentalRoute();