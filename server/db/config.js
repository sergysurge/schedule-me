const Sequelize = require('sequelize')
//const db = new Sequelize('postgres://superuser:superuser@scheduleme.cqwyei9xxclz.us-west-1.rds.amazonaws.com:5432/scheduleme')
// const db = new Sequelize('postgres://ffkgdwnz:DwIxYC_uxOROnlYvKEwt3KH57rUQzqDw@elmer.db.elephantsql.com:5432/ffkgdwnz')
const db = new Sequelize('postgres://oywoznir:p5_J_YyQIoQTUDEXqbXrJ3L-d0F2ww3b@elmer.db.elephantsql.com:5432/oywoznir')

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err)
  })

module.exports = db
