const Sequelize = require('sequelize')
const db = new Sequelize(`postgres://${process.env.ELEPHANT_USER}:${process.env.ELEPHANT_PASSWORD}@elmer.db.elephantsql.com:5432/${process.env.ELEPHANT_USER}`)

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err)
  })

module.exports = db
