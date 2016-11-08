const Appointments = require('../db').Appointment
const User = require('../db').User
const appointmentsModel = {}

appointmentsModel.getAppointments = (employeeId) => {
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

appointmentsModel.addAppointment = (obj) => {
  return Appointments
    .create(obj)
        .then(newAppointment => {
        //   User.find({

        //   })
        //   return newAppointment.setCustomer({})
        //     .then(data => {
        //       console.log('this is DATA', data)
        //       return data
        //   })
        //   .catch(err => {
        //     console.log('error with the creation of apointment relationship')
        //     return err
        //   })
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
        description: obj.description,
        startTime: obj.startTime,
        endTime: obj.endTime,
        customerId: obj.customerId,
        employeeId: obj.employeeId
      })
    })
}

module.exports = appointmentsModel
