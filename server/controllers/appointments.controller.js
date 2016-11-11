const appointmentsController = {}
const appointmentsModel = require('../models').appointmentsModel

appointmentsController.GET_EMPLOYEE_APPOINTMENTS = function (req, res) {
  const post = req.params
  appointmentsModel
    .getEmployeeAppointments(post.employeeId)
    .then(appointment => {
      res.send(appointment)
    })
}

appointmentsController.GET_CUSTOMER_APPOINTMENTS = (req, res) => {
  const customerId = req.params.customerId
  appointmentsModel
    .getCustomerAppointments(customerId)
    .then(appointments => {
      res.send(appointments)
    })
    .catch((err) => {
      res.send(err)
    })
}

appointmentsController.POST = function (req, res) {
  const post = req.body
  appointmentsModel
    .addAppointment(post)
    .then(appointment => {
      res.send(appointment)
    })
}

appointmentsController.DELETE = function (req, res) {
  appointmentsModel
    .deleteAppointment(req.body.appointmentId)
    .then(appointment => {
      res.send(appointment)
    })
}

appointmentsController.PUT = function (req, res) {
  const post = req.body
  appointmentsModel
    .updateAppointment(post)
    .then(appointment => {
      res.send(appointment)
    })
}

module.exports = appointmentsController
