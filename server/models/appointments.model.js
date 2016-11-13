const Appointments = require('../db').Appointment
const User = require('../db').User
const Company = require('../db').Company
const appointmentsModel = {}

appointmentsModel.getEmployeeAppointments = (employeeId) => {
  return Appointments
    .findAll({
      where: {
        employeeId: employeeId
      }
    })
    .then(appointments => {
      return appointments
    })
    .catch(err => {
      console.log('error working in getting appointment', err)
      return err
    })
}

appointmentsModel.getCustomerAppointments = (customerId) => {
  return Appointments
    .findAll({
      where: {
        customerId: customerId
      },
      include: [{
        model: User,
        as: 'employee'
      }, {
        model: Company
      }]
    })
    .then(appointments => {
      return appointments
    })
    .catch(err => {
      console.log('error working in getting appointment', err)
      return err
    })
}

appointmentsModel.addAppointment = (obj) => {
  return Appointments
    .create(obj)
        .then(newAppointment => {
          return newAppointment
        })
        .catch(err => {
          console.log('error with the creation of appointment')
          return err
        })
}

appointmentsModel.deleteAppointment = (appointmentId) => {
  return Appointments
      .findOne({
        where: {id: appointmentId}
      })
      .then(appointment => {
        return appointment.destroy()
      })
      .catch(err => {
        return err
      })
}

appointmentsModel.updateAppointment = (obj) => {
  return Appointments
    .findOne({
      where: {id: obj.appointmentId}
    })
    .then(appointment => {
      return appointment.update({
        contactName: obj.contactName,
        contactNumber: obj.contactNumber,
        service: obj.service,
        startTime: obj.startTime,
        endTime: obj.endTime,
        customerId: obj.customerId,
        employeeId: obj.employeeId
      })
    })
}

module.exports = appointmentsModel
