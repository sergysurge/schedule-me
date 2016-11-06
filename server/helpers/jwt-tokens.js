const jwt = require('jwt-simple')

var generateToken = function (userId) {
  console.log('inside generatetoken')
  var date = new Date()

  const payload = {
    iss: 'ScheduleMe',
    exp: date.setDate(date.getDate() + 7), // token expires in 7 days
    userId: userId
  }
  var token = jwt.encode(payload, process.env.JWT_TOKEN_SECRET)
  return token
}

module.exports = {
  generateToken: generateToken
}
