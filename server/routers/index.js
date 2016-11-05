const Router = require('express').Router()

const AppointmentsRouter = require('./appointments.router')
const CompaniesRouter = require('./companies.router')
const UsersRouter = require('./users.router')

Router.use('/users', UsersRouter)
Router.use('/appointments', AppointmentsRouter)
Router.use('/companies', CompaniesRouter)
Router.use('/auth', UsersRouter)

module.exports = Router
