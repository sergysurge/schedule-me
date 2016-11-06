const express = require('express')

const usersController = require('../controllers').usersController

var UsersRouter = express.Router()

UsersRouter.get('/signin', usersController.SIGNIN)
UsersRouter.post('/signup', usersController.SIGNUP)

module.exports = UsersRouter
