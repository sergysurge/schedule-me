const Schedule = require('../db').Schedule
const UserCompany = require('../db').UserCompany
const scheduleModel = {}

scheduleModel.getoneschedule = userCompanyId => {
  return UserCompany.findById(userCompanyId)
    .then((userCompany) => {
      return userCompany.getSchedules()
      .then((schedules) => {
        return schedules
      })
      .catch((err) => {
        return err
      })
    })
    .catch((err) => {
      return err
    })
}

scheduleModel.getschedules = userCompanyIdsArray => {
  // console.log('MODEL getschedules', userCompanyIdsArray)

  return Schedule.findAll({
    where: {
      UserCompanyId: userCompanyIdsArray
    }
  })
  .then((schedules) => {
    return schedules
  })
  .catch((err) => {
    return err
  })
}

scheduleModel.postoneschedule = userSched => {
  console.log('MODEL postoneschedule:', userSched)
  return Schedule.create({
    startTime: userSched.startTime,
    endTime: userSched.endTime,
    description: userSched.description,
    UserCompanyId: userSched.UserCompanyId
  })
}

scheduleModel.postschedules = manySchedsArrayOfObjs => {
  console.log('MODEL postschedules:', manySchedsArrayOfObjs)
  return Schedule.bulkCreate({manySchedsArrayOfObjs})
}

module.exports = scheduleModel
