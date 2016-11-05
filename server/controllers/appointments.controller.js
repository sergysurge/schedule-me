const appointmentsController = {}
const Appointment = require('../models').Appointments
appointmentsController.GET = function (req, res) {
    console.log('get Appointments')
}

appointmentsController.POST = function (req, res) {
    console.log('post Appointments')
}

appointmentsController.PUT = function(req,res) {
    console.log('put Appointments')
}

module.exports = appointmentsController
