const express = require('express')
const usersController = require('../controllers').usersController
const authenticateToken = require('../middlewares').authenticateToken
var UsersRouter = express.Router()

UsersRouter.get('/signin', usersController.SIGNIN)
UsersRouter.post('/signup', usersController.SIGNUP)

UsersRouter.get('/', authenticateToken, usersController.GET_USER_DETAILS)
UsersRouter.put('/:userId/update', authenticateToken, usersController.UPDATE_USER_INFO)

UsersRouter.get('/employees/:companyId', authenticateToken, usersController.GET_EMPLOYEES)
UsersRouter.put('/employees', authenticateToken, usersController.ADD_USER_TO_COMPANY)
UsersRouter.delete('/employees', authenticateToken, usersController.REMOVE_USER_FROM_COMPANY)
UsersRouter.get('/getemployees/:companyId', authenticateToken, usersController.GETALLEMPLOYEES)


module.exports = UsersRouter
