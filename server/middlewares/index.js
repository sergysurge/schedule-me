const jwt = require('jwt-simple')
const isUserAdmin = require('../helpers').isUserAdmin
const getToken = require('../helpers').getToken

const authenticateToken = (req, res, next) => {
// expects Authorization header of the form: 'Bearer <token>'
  const token = getToken(req.headers)
  if (!token) {
    res.status(400).json({
      response: 'unauthorized'
    })
  } else {
    const decoded = jwt.decode(token, process.env.JWT_TOKEN_SECRET)
    if (decoded.exp <= Date.now() || decoded.iss !== 'ScheduleMe') {
      res.status(400).json({
        response: 'invalid token'
      })
    } else {
      next()
    }
  }
}

const checkAdminAuthorization = (req, res, next) => {
  // check user_id and company_id for admin privelege
  const userId = req.query.userId
  const companyId = req.query.companyId
  isUserAdmin(userId, companyId)
    .then((response) => {
      if (response) {
        next()
      } else {
        res.status(400).json({
          response: 'not authorized'
        })
      }
    })
    .catch((err) => {
      res.status(500).json({
        response: err
      })
    })
}


module.exports = {
  authenticateToken: authenticateToken,
  checkAdminAuthorization: checkAdminAuthorization
}
