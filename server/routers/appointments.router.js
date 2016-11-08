const express = require('express')

const appointmentsController = require('../controllers/appointments.controller')

var AppointmentsRouter = express.Router()

AppointmentsRouter.get('/:employeeId', appointmentsController.GET)
AppointmentsRouter.post('/', appointmentsController.POST)
AppointmentsRouter.put('/', appointmentsController.PUT)
AppointmentsRouter.delete('/', appointmentsController.DELETE)

module.exports = AppointmentsRouter
