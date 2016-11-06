const usersModel = require('../models').usersModel
const usersController = {}

usersController.SIGNIN = function (req, res) {
  var email = req.query.email
  var password = req.query.password
  usersModel.signin(email, password)
}

usersController.SIGNUP = function (req, res) {
  var email = req.query.email
  var password = req.query.password
  usersModel.signup(email, password)
}

module.exports = usersController
