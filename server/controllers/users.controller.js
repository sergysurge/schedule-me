const usersModel = require('../models').usersModel
const usersController = {}

usersController.SIGNIN = function (req, res) {
  var email = req.query.email
  var password = req.query.password

  usersModel.signin(email, password)
    .then(function (result) {
      if (result === 'correct password') {
        res.status(200).send(result)
      } else if (result === 'incorrect password') {
        res.status(400).send(result)
      } else if (result === 'user not found') {
        res.status(200).send(result)
      }  
    })
    .catch(function (err) {
      res.status(500).send(err)
    })
}

usersController.SIGNUP = function (req, res) {
  console.log(req.body, 'asdfadf')
  var user = req.body.user

  usersModel.signup(user)
    .then(function (result) {
      if (result) {
        // generate jwt token
        res.status(200).json(result)
      } else {
        res.status(200).json('user exists')
      }
    })
}

module.exports = usersController
