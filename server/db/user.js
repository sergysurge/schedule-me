const Sequelize = require('sequelize')

module.exports = function (db) {
  var User = db.define('user', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true
      }
    }
  })
  return User
}
