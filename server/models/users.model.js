const User = require('../db').User
const Company = require('../db').Company
const UserCompany = require('../db').UserCompany

const usersModel = {}

usersModel.getAllEmployeesCompanyId = companyId => {
  return UserCompany.findAll({
    where: {companyId: companyId.companyId}
  })
}

usersModel.signin = (email, password) => {
  return User.findOne({
    where: {
      email: email
    }
  })
  .then((user) => {
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
  .catch((err) => {
    return {
      'success': false,
      'message': err
    }
  })
}

usersModel.signup = (user) => {
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
  .spread((newUser, created) => {
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

usersModel.getEmployeesByCompany = (companyId) => {
  return Company.findById(companyId)
    .then((company) => {
      if (!company) {
        return {
          'success': false,
          'message': 'company not found'
        }
      }
      return company.getUsers()
        .then((users) => {
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
        .catch((err) => {
          return {
            'success': false,
            'message': err
          }
        })
    })
    .catch((err) => {
      return {
        'success': false,
        'message': err
      }
    })
}

usersModel.addUserToCompany = function (userId, companyId, isAdmin) {
  return User.findById(userId)
    .then((user) => {
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
      .then((companies) => {
        if (companies.length) {
          return {
            'success': false,
            'message': 'relation between user and company already exists'
          }
        }
        // add user to company
        return Company.findById(companyId)
          .then((company) => {
            if (!company) {
              return {
                'success': false,
                'message': 'company not found'
              }
            }
            return user.addCompany(company, { admin: isAdmin })
              .then((association) => {
                return {
                  'success': true,
                  'message': 'user added to company',
                  'association': association[0][0]
                }
              })
              .catch((err) => {
                return {
                  'success': false,
                  'message': err
                }
              })
          })
          .catch((err) => {
            return {
              'success': false,
              'message': err
            }
          })
      })
    })
}

usersModel.removeUserFromCompany = (userId, companyId) => {
  return Company.findById(companyId)
    .then((company) => {
      if (!company) {
        return {
          'success': false,
          'message': 'company not found'
        }
      }
      return User.findById(userId)
        .then((user) => {
          if (!user) {
            return {
              'success': false,
              'message': 'user not found'
            }
          }
          return company.removeUser(user)
            .then(() => {
              return {
                'success': true,
                'message': 'user removed'
              }
            })
            .catch((err) => {
              return {
                'success': false,
                'message': err
              }
            })
        })
    })
}

usersModel.updateUserInfo = (userInfo) => {
  return User.findById(userInfo.id)
    .then((user) => {
      if (!user) {
        return {
          'success': false,
          'message': 'user not found'
        }
      }
      // user must input correct password to update info
      if (user.checkPassword(userInfo.oldPassword)) {
        return user.update(userInfo.newInfo)
          .then((updatedUser) => {
            return {
              'success': true,
              'message': 'user info updated'
            }
          })
          .catch((err) => {
            return {
              'success': false,
              'message': err
            }
          })
      } else {
        // incorrect password
        return {
          'success': false,
          'message': 'incorrect password'
        }
      }
    })
    .catch((err) => {
      return {
        'success': false,
        'message': err
      }
    })
}

module.exports = usersModel
