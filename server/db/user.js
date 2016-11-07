const Sequelize = require('sequelize')
const bcrypt = require('bcrypt-nodejs')

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
  }, {
    hooks: {
      beforeCreate: function (user, options, callback) {
        // hash password before saving
        var salt = bcrypt.genSaltSync(10)
        bcrypt.hash(user.password, salt, null, function (err, hash) {
          if (err) {
            console.log('error hashing password: ', err)
            callback(err, null)
          }
          user.password = hash
          callback(null, user)
        })
      }
    },
    instanceMethods: {
      checkPassword: function (candidatePassword) {
        return bcrypt.compareSync(candidatePassword, this.password)
      }
    }
  })

  return User
}

