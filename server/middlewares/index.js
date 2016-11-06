const jwt = require('jwt-simple')

const authenticateToken = function (req, res, next) {
// expects Authorization header of the form: 'Bearer <token>'
  const token = getToken(req.headers)
  if (!token) {
    res.status(400).json({
      message: 'unauthorized'
    })
  } else {
    const decoded = jwt.decode(token, process.env.JWT_TOKEN_SECRET)
    if (decoded.exp <= Date.now() || decoded.iss !== 'ScheduleMe') {
      res.status(400).json({
        message: 'invalid token'
      })
    } else {
      next()
    }
  }
}

function getToken (header) {
  if (header['Authorization']) {
    if (header['Authorization'].indexOf('Bearer') !== -1) {
      return header['Authorization'].split(' ')[1]
    } else {
      return false
    }
  } else {
    return false
  }
}

module.exports = {
  authenticateToken: authenticateToken
}
