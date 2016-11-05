const express = require('express')

const appointmentsController = require('../controllers/appointments.controller')

var AppointmentsRouter = express.Router()

AppointmentsRouter.get('/', appointmentsController.GET)
AppointmentsRouter.post('/', appointmentsController.POST)

module.exports = AppointmentsRouter
