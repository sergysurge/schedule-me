// test spec for users routing, controllers and models
// from root directory, mocha --reporter nyan ./server/spec/users.spec.js
const expect = require('chai').expect
const request = require('request')
const User = require('../db').User

describe('test spec', function () {
  it('test spec should work', function () {
    var x = 2 + 2
    expect(x).to.equal(4)
  })
})

xdescribe('user routing', function() {
  it('should route requests for /api/users/signin', function (done) {
    var options = {
      url: 'http://localhost:8000/api/users/signin',
      method: 'GET'
    }
    request(options, function (err, response, body) {
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
  it('should route requests for /api/users/signup', function (done) {
    var options = {
      url: 'http://localhost:8000/api/users/signup',
      method: 'POST'
    }
    request(options, function (err, response, body) {
      expect(response.statusCode).to.equal(200)
      done()
    })
  })
})

describe('User table unit tests', function (done) {
  it('should be able to create new user in User table', function (done) {
    User.create({
      firstName: 'dummy',
      lastName: 'dummy',
      email: 'lu@lu.com',
      password: 'lu',
      phoneNumber: '111-111-1111',
      image: 'http://www.google.com'
    })
    .then(function (user) {
      expect(user.firstName).to.equal('dummy')
      expect(user.password).to.not.equal('dummy')
      user.destroy()
      done()
    })
    .catch(function (err) {
      console.log('error creating user: ', err)
      done()
    })
  })
})
