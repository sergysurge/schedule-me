const express = require('express')

const appointmentsController = require('../controllers/appointments.controller')

var AppointmentsRouter = express.Router()

AppointmentsRouter.get('/:employeeId', appointmentsController.GET_EMPLOYEE_APPOINTMENTS)
AppointmentsRouter.post('/', appointmentsController.POST)
AppointmentsRouter.put('/', appointmentsController.PUT)
AppointmentsRouter.delete('/', appointmentsController.DELETE)
AppointmentsRouter.get('/customer/:customerId', appointmentsController.GET_CUSTOMER_APPOINTMENTS)

module.exports = AppointmentsRouter
