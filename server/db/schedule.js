const Sequelize = require('sequelize')

module.exports = function (db) {
  let Schedule = db.define('schedule', {
    startTime: Sequelize.DATE,
    endTime: Sequelize.DATE,
    comment: Sequelize.STRING
  })
  return Schedule
}
