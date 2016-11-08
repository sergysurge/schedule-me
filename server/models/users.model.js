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
      if (!company) {
        return {
          'success': false,
          'message': 'company not found'
        }
      }
      return company.getUsers()
        .then(function (users) {
          var employees = users.map((user) => {
            return {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phoneNumer: user.phoneNumber,
              image: user.image
            }
          })
          return {
            'success': true,
            'message': 'employees found',
            'employees': employees
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

usersModel.addUserToCompany = function (userId, companyId, isAdmin) {
  return User.findById(userId)
    .then(function (user) {
      if (!user) {
        return {
          'success': false,
          'message': 'user not found'
        }
      }
      // check if user already connected to company
      return user.getCompanies({
        where: {
          id: companyId
        }
      })
      .then(function (companies) {
        if (companies.length) {
          return {
            'success': false,
            'message': 'relation between user and company already exists'
          }
        }
        // add user to company
        return Company.findById(companyId)
          .then(function (company) {
            if (!company) {
              return {
                'success': false,
                'message': 'company not found'
              }
            }
            return user.addCompany(company, { admin: isAdmin })
              .then(function (association) {
                return {
                  'success': true,
                  'message': 'user added to company',
                  'association': association[0][0]
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
      })
    })
}

usersModel.removeUserFromCompany = function (userId, companyId) {
  return Company.findById(companyId)
    .then(function (company) {
      if (!company) {
        return {
          'success': false,
          'message': 'company not found'
        }
      }
      return User.findById(userId)
        .then(function (user) {
          if (!user) {
            return {
              'success': false,
              'message': 'user not found'
            }
          }
          return company.removeUser(user)
            .then(function () {
              return {
                'success': true,
                'message': 'user removed'
              }
            })
            .catch(function (err) {
              return {
                'success': false,
                'message': err
              }
            })
        })
    })
}

module.exports = usersModel
