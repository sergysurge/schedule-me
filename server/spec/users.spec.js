// test spec for users routing, controllers and models
// from root directory, run node ./server/server.js & mocha --reporter nyan ./server/spec/users.spec.js
const expect = require('chai').expect
const request = require('request')

describe('test spec', function () {
  it('test spec should work', function () {
    var x = 2 + 2
    expect(x).to.equal(4)
  })
})

describe('user routing', function() {
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