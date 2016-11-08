const jwt = require('jwt-simple')
const User = require('./models').User

const getToken = (header) => {
  if (header['authorization']) {
    if (header['authorization'].indexOf('Bearer') !== -1) {
      return header['authorization'].split(' ')[1]
    }
    return false
  }
  return false
}

const generateToken = (userId) => {
  var date = new Date()
  const payload = {
    iss: 'ScheduleMe',
    exp: date.setDate(date.getDate() + 7), // token expires in 7 days
    userId: userId
  }
  var token = jwt.encode(payload, process.env.JWT_TOKEN_SECRET)
  return token
}

const isUserAdmin = (userId, companyId) => {
  // check whether user is an admin for company
  return User.findById(userId)
    .then((user) => {
      return user.getCompanies({
        where: {
          id: companyId
        },
        attributes: ['id', 'admin']
      })
      .then((company) => {
        return company.UserCompany.admin
      })
      .catch((err) => {
        return err
      })
    })
    .catch((err) => {
      return err
    })
}
module.exports = {
  getToken: getToken,
  generateToken: generateToken,
  isUserAdmin: isUserAdmin
}
