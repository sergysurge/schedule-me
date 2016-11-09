const usersModel = require('../models').usersModel
const generateToken = require('../helpers').generateToken

const usersController = {}

usersController.SIGNIN = function (req, res) {
  // var email = req.query.email
  // var password = req.query.password
  const encodedCredentials = req.headers['authorization']
  var email, password
  [email, password] = new Buffer(encodedCredentials, 'base64').toString().split(':')
  usersModel.signin(email, password)
    .then((response) => {
      if (response.success) {
        const token = generateToken(response.userId)
        res.status(200).json({
          response: response,
          token: token
        })
      } else if (response.message === 'incorrect password') {
        res.status(403).json({
          response: response
        })
      } else if (response.message === 'user not found') {
        res.status(200).json({
          response: response
        })
      }
    })
    .catch((err) => {
      res.status(500).json({
        response: err
      })
    })
}

usersController.SIGNUP = (req, res) => {
  const user = req.body.user

  usersModel.signup(user)
    .then((response) => {
      if (response.success) {
        const token = generateToken(response.userId)
        res.status(200).json({
          response: response,
          token: token
        })
      } else {
        res.status(200).json({
          response: response
        })
      }
    })
}

usersController.GET_EMPLOYEES = (req, res) => {
  const companyId = req.query.companyId
  usersModel.getEmployeesByCompany(companyId)
    .then((response) => {
      res.status(200).json({
        response: response
      })
    })
    .catch((err) => {
      res.status(500).json({
        response: err
      })
    })
}

usersController.ADD_USER_TO_COMPANY = (req, res) => {
  const userId = req.body.userId
  const companyId = req.body.companyId
  const isAdmin = req.body.isAdmin
  usersModel.addUserToCompany(userId, companyId, isAdmin)
    .then((response) => {
      res.status(200).json({
        response: response
      })
    })
    .catch((err) => {
      res.status(500).json({
        response: err
      })
    })
}

usersController.REMOVE_USER_FROM_COMPANY = (req, res) => {
  const userId = req.body.userId
  const companyId = req.body.companyId
  usersModel.removeUserFromCompany(userId, companyId)
    .then((response) => {
      res.status(200).json({
        response: response
      })
    })
    .catch((err) => {
      res.status(500).json({
        response: err
      })
    })
}

usersController.UPDATE_USER_INFO = (req, res) => {
  const user = req.body.user
  // expects user object with id, oldPassword and newInfo fields
  usersModel.updateUserInfo(user)
    .then((response) => {
      res.status(200).json({
        response: response
      })
    })
    .catch((err) => {
      res.status(500).json({
        response: err
      })
    })
}

module.exports = usersController
