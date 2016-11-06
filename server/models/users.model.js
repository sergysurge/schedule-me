const User = require('../db').User
const jwt = require('jwt-simple')

const usersModel = {}

usersModel.signin = function (email, password) {
  return User.findOne({
    where: {
      email: email
    }
  })
  .then(function (user) {
    if (user) {
      if (user.checkPassword(password)) {
        return 'correct password'
      }
      return 'incorrect password'
    }
    return 'user not found'
  })
  .catch(function (err) {
    return err
  })
}

usersModel.signup = function (user) {
  return User.findOrCreate({
    where: {
      email: user.email
    },
    defaults: {
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      phoneNumber: user.phoneNumber,
      image: user.image
    }
  })
  .spread(function (newUser, created) {
    if (created) {
      return newUser
    }
    return created
  })
}

module.exports = usersModel
