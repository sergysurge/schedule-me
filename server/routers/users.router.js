const express = require('express')

const usersController = require('../controllers/users.controller')

var UsersRouter = express.Router()

UsersRouter.get('/', usersController.GET)
UsersRouter.post('/', usersController.POST)

module.exports = UsersRouter
