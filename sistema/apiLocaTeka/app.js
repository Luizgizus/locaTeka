const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const movieRoutes = require('./src/routes/movieRoutes');
const movieRentalRoutes = require('./src/routes/movieRentalRoute');
const authRoutes = require('./src/routes/authRoutes');
const cors = require('cors');

require('dotenv').config();



const requireAuth = require('./src/middleware/authMiddleware');
const requireAdmin = require('./src/middleware/adminMiddleware');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.databaseUrl = 'mongodb://localhost:27017/locateka';
  }

  async connectToDatabase() {
    try {
      await mongoose.connect(this.databaseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Conectado ao MongoDB');
    } catch (err) {
      console.error('Erro ao conectar ao MongoDB:', err);
    }
  }

  middlewares() {
    const corsOptions = {
      origin: 'http://localhost:3000',
      allowedHeaders: ['Content-Type', 'Authorization'],
    }

    this.app.use(cors(corsOptions));
    this.app.use(bodyParser.json());
    //this.app.use(requireAuth);
    this.app.use('/movies', requireAdmin);
    
    this.app.use('/users', userRoutes);
    this.app.use('/movies', movieRoutes);
    this.app.use('/movie-rental', movieRentalRoutes.router);
    this.app.use('/auth', authRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor rodando em http://localhost:${this.port}`);
    });
  }

  async start() {
    await this.connectToDatabase();
    this.middlewares();
    this.listen();
  }
}

new Server().start();