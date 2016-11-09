const appointmentsController = {}
const Appointment = require('../models/index').appointmentsModel

appointmentsController.GET = function (req, res) {
  const post = req.params
  Appointment
  .getAppointments(post.employeeId)
  .then(appointment => {
    res.send(appointment)
  })
}

appointmentsController.POST = function (req, res) {
  const post = req.body
  Appointment
  .addAppointment(post)
  .then(appointment => {
    res.send(appointment)
  })
}

appointmentsController.DELETE = function (req, res) {
  Appointment
  .deleteAppointment(req.body.appointmentId)
  .then(appointment => {
    res.send(appointment)
  })
}

appointmentsController.PUT = function (req, res) {
  const post = req.body
  Appointment
  .updateAppointment(post)
  .then(appointment => {
    res.send(appointment)
  })
}

module.exports = appointmentsController
