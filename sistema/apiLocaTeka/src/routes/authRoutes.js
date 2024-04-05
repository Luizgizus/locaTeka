const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtSecret = process.env.JWT_SECRET

class AuthRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/register', this.registerUser);
    this.router.post('/login', this.loginUser);
  }

  async registerUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.status(201).send(newUser);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async loginUser(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send({ message: 'Email ou senha inválidos' });
      }

      const token = jwt.sign({ id: user.id, type: user.type }, jwtSecret, { expiresIn: '1h' });

      res.send({ user, token });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
}

module.exports = new AuthRoutes().router;