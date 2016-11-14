const express = require('express')
const authenticateToken = require('../middlewares').authenticateToken
const usersController = require('../controllers').usersController

var UsersRouter = express.Router()

UsersRouter.get('/signin', usersController.SIGNIN)
UsersRouter.post('/signup', usersController.SIGNUP)

UsersRouter.get('/', usersController.GET_USER_DETAILS)
UsersRouter.put('/:userId/update', usersController.UPDATE_USER_INFO)

UsersRouter.get('/employees', usersController.GET_EMPLOYEES)
UsersRouter.put('/employees', usersController.ADD_USER_TO_COMPANY)
UsersRouter.delete('/employees', usersController.REMOVE_USER_FROM_COMPANY)
UsersRouter.get('/getemployees/:companyId', usersController.GETALLEMPLOYEES)


module.exports = UsersRouter
