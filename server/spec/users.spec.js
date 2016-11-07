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

xdescribe('User table unit tests', function () {
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

describe ('User signup', function (done) {
  it ('should create new entry in User table', function (done) {
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

        User.findOne({
          where: {
            id: userId
          }
        })
        .then(function (user) {
          user.destroy()
          done()
        })
      })
    })
  })
})

describe('User signin', function() {
  const newEmail = 'nomore@onomore.com'
  const password = 'password'

  const signinOptions = {
    url: 'http://localhost:8000/api/users/signin',
    method: 'GET',
    headers: {
      'Authorization': new Buffer(`${newEmail}:${password}`).toString('base64')
    }
  }
  const newUser = {
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
    request(signupOptions, function (err, response, body) {
      expect(response.statusCode).to.equal(200)
      expect(body.response.success).to.equal(true)

      request(signinOptions, function (err, response, body) {
        const parsed = JSON.parse(body)
        expect(response.statusCode).to.equal(200)
        expect(parsed.response.success).to.equal(true)
        expect(parsed.token).to.exist

        User.findOne({
          where: {
            id: parsed.response.userId
          }
        })
        .then(function (user) {
          user.destroy()
        })
        done()
      })
    })
  })
})
