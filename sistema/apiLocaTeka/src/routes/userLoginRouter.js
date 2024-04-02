const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

class UserLoginRouter {
  constructor(app, SECRET_KEY) {
    this.app = app;
    this.SECRET_KEY = SECRET_KEY;

    this.app.use(bodyParser.json());
    this.app.post("/login", this.login.bind(this));
    this.app.get(
      "/check-session",
      this.authenticateToken.bind(this),
      this.checkSession.bind(this)
    );
  }

  async login(req, res) {
    const user = new User({
      username: 'example_user',
      email: 'user@example.com'
    });

    try {
      await user.save();

      const token = jwt.sign({ userId: user._id }, this.SECRET_KEY, { expiresIn: '1h' });
      const session = new Session({ userId: user._id, token });
      await session.save();

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate token' });
    }
  }

  async authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    try {
      const decoded = jwt.verify(token, this.SECRET_KEY);
      req.user = { userId: decoded.userId };
      next();
    } catch (error) {
      res.sendStatus(403);
    }
  }

  async checkSession(req, res) {
    // Lógica para verificar a sessão aqui
  }
}

module.export =  UserLoginRouter