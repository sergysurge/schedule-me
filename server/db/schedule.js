const Sequelize = require('sequelize')

module.exports = function (db) {
  let Schedule = db.define('schedule', {
    startTime: Sequelize.DATE,
    endTime: Sequelize.DATE,
    description: Sequelize.STRING
  })
  return Schedule
}
