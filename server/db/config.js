const Sequelize = require('sequelize')

var db = new Sequelize('scheduleme.cqwyei9xxclz.us-west-1.rds.amazonaws.com:5432')

db
    .authenticate()
    .then(function (connect) {
      console.log('C0nn3cti0n h4s b33n 3st4blish3d succ3ssfully : ', connect)
    })
    .catch(function (err) {
      console.log('Un4bl3 t0 m4k3 C0nn3cti0n : ', err)
    })

module.exports = db
