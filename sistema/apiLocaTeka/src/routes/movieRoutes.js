const express = require('express');
const Movie = require('../models/Movie');
const upload = require('./upload');

const movieRentalRoute = require('./movieRentalRoute');

class MovieRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/', upload.single('imagemCartaz'), this.createMovie);
    this.router.get('/', this.listMovies);
    this.router.get('/:id', this.getMovieById);
    this.router.put('/:id', upload.single('imagemCartaz'), this.updateMovie);
    this.router.delete('/:id', this.deleteMovie);
    this.router.get('/borrow/:id', this.borrowMovie);
    this.router.get('/return-borrow/:id', this.returnBorrowMovie);
  }

  async createMovie(req, res) {
    try {
      console.log(req.body);
      const { nome, atores, quantidadeDvds } = req.body;
      const movie = await Movie.create({
        nome,
        atores: JSON.parse(atores),
        imagemCartaz: req.file.path,
        quantidadeDvds,
      });
      res.status(201).send(movie);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async listMovies(req, res) {
    try {
      const movies = await Movie.find();
      res.send(movies);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getMovieById(req, res) {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) {
        return res.status(404).send({ message: 'Filme não encontrado!' });
      }
      res.send(movie);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async updateMovie(req, res) {
    const updates = req.body;
    if (req.file) {
      updates.imagemCartaz = req.file.path;
    }
    try {
      const movie = await Movie.findByIdAndUpdate(req.params.id, updates, { new: true });
      if (!movie) {
        return res.status(404).send({ message: 'Filme não encontrado!' });
      }
      res.send(movie);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async deleteMovie(req, res) {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);
      if (!movie) {
        return res.status(404).send({ message: 'Filme não encontrado!' });
      }
      res.send({ message: 'Filme deletado com sucesso!' });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async borrowMovie(req, res) {
    const updates = req.body;
    if (req.file) {
      updates.imagemCartaz = req.file.path;
    }
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) {
        return res.status(404).send({ message: 'Filme não encontrado!' });
      }
  
      if(movie.qtdDvds > 0){
        await Movie.Update(req.params.id, { $inc: { qtdDvds: -1 } }, { new: true });
      }
      res.send(movie);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async returnBorrowMovie(req, res) {
    const updates = req.body;
    if (req.file) {
      updates.imagemCartaz = req.file.path;
    }
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) {
        return res.status(404).send({ message: 'Filme não encontrado!' });
      }
  
      await Movie.Update(req.params.id, { $inc: { qtdDvds: 1 } }, { new: true });
      res.send(movie);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = new MovieRoutes().router;