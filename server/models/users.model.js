const User = require('../db').User
const Company = require('../db').Company

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
        return {
          'success': true,
          'message': 'correct password',
          'userId': user.id
        }
      } else {
        return {
          'success': false,
          'message': 'incorrect password'
        }
      }
    } else {
      return {
        'success': false,
        'message': 'user not found'
      }
    }
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
      return {
        'success': true,
        'message': 'new user created',
        'userId': newUser.id
      }
    }
    return {
      'success': false,
      'message': 'user already exists'
    }
  })
}

usersModel.getEmployeesByCompany = function (companyId) {
  return Company.findById(companyId)
    .then(function (company) {
      company.getUsers()
        .then(function (users) {
          if (users.length) {
            return {
              'success': true,
              'message': 'employees found',
              'employees': users
            }
          }
          return {
            'success': true,
            'message': 'no employees found'
          }
        })
        .catch(function (err) {
          return {
            'success': false,
            'message': err
          }
        })
    })
    .catch(function (err) {
      return {
        'success': false,
        'message': err
      }
    })
}

usersModel.addUserToCompany = function (userId, companyId) {
  
}

module.exports = usersModel
