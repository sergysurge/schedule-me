const Sequelize = require('sequelize')

module.exports = function (db) {
  const Company = db.define('company', {
    name: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    website: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true
      }
    },
    image: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true
      }
    },
    logo: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true
      }
    }
  })
  return Company
}

