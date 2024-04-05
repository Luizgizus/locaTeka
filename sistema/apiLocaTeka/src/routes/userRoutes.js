const express = require('express');
const User = require('../models/User');

class UserRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Cadastrar um novo usuário
    this.router.post('/', async (req, res) => {
      try {
        const user = await User.create(req.body);
        res.status(201).send(user);
      } catch (error) {
        console.log(error)
        res.status(400).send(error);
      }
    });

    // Listar todos os usuários
    this.router.get('/', async (req, res) => {
      try {
        const users = await User.find();
        res.send(users);
      } catch (error) {
        res.status(500).send(error);
      }
    });

    // Atualizar um usuário
    this.router.put('/:id', async (req, res) => {
      try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(user);
      } catch (error) {
        res.status(400).send(error);
      }
    });

    // Deletar um usuário
    this.router.delete('/:id', async (req, res) => {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.send({ message: 'Usuário deletado com sucesso!' });
      } catch (error) {
        res.status(500).send(error);
      }
    });
  }
}

module.exports = new UserRoutes().router;