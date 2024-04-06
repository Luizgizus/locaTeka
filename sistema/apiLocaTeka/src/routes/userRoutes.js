const express = require('express');
const User = require('../models/User');

class UserRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/', this.createUser);
    this.router.get('/', this.listUser);
    this.router.get('/:id', this.findUserById);
    this.router.put('/:id', this.updateUser);
    this.router.delete('/:id', this.deleteUser);
  }

    async createUser(req, res) {
      try {
        const user = await User.create(req.body);
        res.status(201).send(user);
      } catch (error) {
        console.log(error)
        res.status(400).send(error);
      }
    }

    async listUser(req, res) {
      try {
        const users = await User.find();
        res.send(users);
      } catch (error) {
        res.status(500).send(error);
      }
    }

    async findUserById(req, res) {
      try {
        const users = await User.findById(req.params.id);
        res.send(users);
      } catch (error) {
        res.status(500).send(error);
      }
    }

    async updateUser(req, res) {
      try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(user);
      } catch (error) {
        res.status(400).send(error);
      }
    }

    async deleteUser(req, res) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.send({ message: 'Usuário deletado com sucesso!' });
      } catch (error) {
        res.status(500).send(error);
      }
    };
}

module.exports = new UserRoutes().router;