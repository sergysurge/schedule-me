const usersModel = require('../models').usersModel
const usersController = {}

usersController.SIGNIN = function (req, res) {
  var email = req.query.email
  var password = req.query.password
  usersModel.signin(email, password)
}

usersController.SIGNUP = function (req, res) {
  var user = req.body.user

  usersModel.signup(user)
    .then(function (result) {
      if (result) {
        res.status(200).json(result)
      } else {
        res.status(200).json('user exists')
      }
    })
}

module.exports = usersController
