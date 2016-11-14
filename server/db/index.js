const db = require('./config')
const Sequelize = require('sequelize')
const Appointment = require('./appointment')(db)
const Company = require('./company')(db)
const User = require('./user')(db)
const Schedule = require('./schedule')(db)

const UserCompany = db.define('UserCompany', {
  admin: Sequelize.BOOLEAN,
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})

const BrandName = db.define('BrandName', {
  name: Sequelize.STRING
})

const Option = db.define('Option', {
  duration: Sequelize.INTEGER,
  service: Sequelize.STRING,
  description: Sequelize.STRING
})

Company.hasMany(Option)
Company.hasOne(BrandName)
UserCompany.hasMany(Schedule)

User.belongsToMany(Company, {through: UserCompany})
Company.belongsToMany(User, {through: UserCompany})

// Appointment.belongsTo(User)
// User.hasMany(Appointment)

Appointment.belongsTo(User, {as: 'customer'})
Appointment.belongsTo(User, {as: 'employee'})
Appointment.belongsTo(Company)

// HELPER TO DROP ALL TABLES
// db.sync({force: true}).then(function () {
//   console.log('Tables have been dropped')
// })
db.sync().then(() => {
  console.log('Tables have been Created')
})

module.exports = {
  Appointment: Appointment,
  Company: Company,
  User: User,
  UserCompany: UserCompany,
  Schedule: Schedule,
  BrandName: BrandName,
  Option: Option
}
