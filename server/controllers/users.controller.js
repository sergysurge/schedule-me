const usersModel = require('../models').usersModel
const generateToken = require('../helpers/jwt-tokens').generateToken

const usersController = {}

usersController.SIGNIN = function (req, res) {
  var email = req.query.email
  var password = req.query.password

  usersModel.signin(email, password)
    .then(function (response) {
      if (response.success) {
        const token = generateToken(response.userId)
        res.status(200).json({
          response: response,
          token: token
        })
      } else if (response.message === 'incorrect password') {
        res.status(400).json({
          response: response
        })
      } else if (response.message === 'user not found') {
        res.status(200).json({
          response: response
        })
      }
    })
    .catch(function (err) {
      res.status(500).send(err)
    })
}

usersController.SIGNUP = function (req, res) {
  var user = req.body.user

  usersModel.signup(user)
    .then(function (response) {
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

module.exports = usersController
