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

describe ('User signup', function (done) {
  it ('new user should be able to sign up', function (done) {
    var newUser = {
      firstName: 'test1',
      lastName: 'test1',
      email: 'test3@test2.com',
      password: 'test',
      phoneNumber: '222-222-2222',
      image: 'http://www.google.com'
    }
    var options = {
      url: 'http://localhost:8000/api/users/signup',
      method: 'POST',
      json: {
        user: newUser
      }
    }
    request(options, function (err, response, body) {
      expect(response.statusCode).to.equal(200)
      expect(body.response.success).to.equal(true)
      expect(body.response.message).to.equal('new user created')
      User.findOne({
        where: {
          id: body.response.userId
        }
      })
      .then(function (user) {
        user.destroy()
        done()
      })
    })
  })

  it ('should send appropriate response if user already exists', function (done) {
    const newUser1 = {
      firstName: '1',
      lastName: '1',
      email: '33@33.com',
      password: 'test',
      phoneNumber: '222-222-2222',
      image: 'http://www.google.com'
    }
    const newUser2 = {
      firstName: 'first',
      lastName: 'first',
      email: '33@33.com',
      password: 'test',
      phoneNumber: '222-222-2222',
      image: 'http://www.google.com'
    }
    const options1 = {
      url: 'http://localhost:8000/api/users/signup',
      method: 'POST',
      json: {
        user: newUser1
      }
    }
    const options2 = {
      url: 'http://localhost:8000/api/users/signup',
      method: 'POST',
      json: {
        user: newUser2
      }
    }
    var userId
    request(options1, function (err, response, body) {
      expect(response.statusCode).to.equal(200)
      expect(body.response.success).to.equal(true)
      expect(body.response.message).to.equal('new user created')
      expect(body.response.userId).to.be.a('number')
      userId = body.response.userId

      request(options2, function (err, response, body) {
        expect(response.statusCode).to.equal(200)
        expect(body.response.success).to.equal(false)
        expect(body.response.message).to.equal('user already exists')

        User.findById(userId)
        .then((user) => {
          user.destroy()
          done()
        })
      })
    })
  })
})

describe('User signin', function () {
  const newEmail = 'testing5@testing5.com'
  var password = 'password'
  var newUserId
  const signinOptions = {
    url: 'http://localhost:8000/api/users/signin',
    method: 'GET',
    headers: {
      'Authorization': new Buffer(`${newEmail}:${password}`).toString('base64')
    }
  }
  const signinWithWrongPasswordOptions = {
    url: 'http://localhost:8000/api/users/signin',
    method: 'GET',
    headers: {
      'Authorization': new Buffer(`${newEmail}:wrongPassword`).toString('base64')
    }
  }
  var newUser = {
    firstName: 'new',
    lastName: 'new',
    email: newEmail,
    password: password,
    phoneNumber: '111-111-1111',
    image: 'http://www.example.com'
  }

  it('should send appropriate response if user does not exist', function (done) {
    request(signinOptions, function (err, response, body) {
      expect(response.statusCode).to.equal(200)
      expect(JSON.parse(body).response.message).to.equal('user not found')
      done()
    })
  })

  it('should be able to login to an existing account', function (done) {
    const signupOptions = {
      url: 'http://localhost:8000/api/users/signup',
      method: 'POST',
      json: {
        user: newUser
      }
    }
    // create new user
    request(signupOptions, function (err, response, body) {
      expect(response.statusCode).to.equal(200)
      expect(body.response.success).to.equal(true)

      // signin with wrong password
      request(signinWithWrongPasswordOptions, function (err, response, body) {
        const parsed = JSON.parse(body)
        expect(response.statusCode).to.equal(403)
        expect(parsed.response.message).to.equal('incorrect password')

        // signin with correct password
        request(signinOptions, function (err, response, body) {
          const parsed = JSON.parse(body)
          expect(response.statusCode).to.equal(200)
          expect(parsed.response.success).to.equal(true)
          expect(parsed.token).to.exist
          // save user id to delete new user at end of test
          newUserId = parsed.response.userId

          User.findById(newUserId)
            .then((user) => {
              user.destroy()
            })
          done()
        })
      })
    })
  })
})
