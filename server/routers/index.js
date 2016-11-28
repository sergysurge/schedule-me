const Router = require('express').Router()
const authenticateToken = require('../middlewares').authenticateToken
const AppointmentsRouter = require('./appointments.router')
const CompaniesRouter = require('./companies.router')
const UsersRouter = require('./users.router')
const SchedulesRouter = require('./schedules.router')

Router.use('/users', UsersRouter)
Router.use('/appointments', authenticateToken, AppointmentsRouter)
Router.use('/companies', authenticateToken, CompaniesRouter)
Router.use('/schedules', authenticateToken, SchedulesRouter)

module.exports = Router
