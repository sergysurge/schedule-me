const Sequelize = require('sequelize')

module.exports = function (db) {
  let Schedule = db.define('schedule', {
    startTime: Sequelize.DATE,
    endTime: Sequelize.DATE,
    block: Sequelize.STRING(2000),
    description: Sequelize.STRING
  })
  return Schedule
}
