const Sequelize = require('sequelize')

module.exports = function (db) {
  let Schedule = db.define('schedule', {
    startTime: Sequelize.DATE,
    endTime: Sequelize.DATE,
    block: Sequelize.STRING,
    description: Sequelize.STRING
  })
  return Schedule
}
