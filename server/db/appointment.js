const Sequelize = require('sequelize')

module.exports = function (db) {
  let Appointment = db.define('appointment', {
    contactName: {
      type: Sequelize.STRING
    },
    contactNumber: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    startTime: {
      type: Sequelize.DATE
    },
    endTime: {
      type: Sequelize.DATE
    },
    comment: {
      type: Sequelize.STRING
    }
  })
  return Appointment
}


