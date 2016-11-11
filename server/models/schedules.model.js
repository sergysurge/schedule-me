const Schedule = require('../db').Schedule
const scheduleModel = {}

scheduleModel.getoneschedule = userComapnyId => {
  console.log('MODEL getoneschedule:', userComapnyId)
  return Schedule.findById(userComapnyId.id)
}

scheduleModel.getschedules = userCompanyIdsArray => {
  console.log('MODEL getschedules', userCompanyIdsArray)
  return Schedule.findAll({
    where: {id: userCompanyIdsArray}
  })
}

scheduleModel.postoneschedule = userSched => {
  console.log('MODEL postoneschedule:', userSched)
  return Schedule.create({
    startTime: userSched.startTime,
    endTime: userSched.endTime,
    comment: userSched.comment,
    UserCompanyId: userSched.UserCompanyId
  })
}

scheduleModel.postschedules = manySchedsArrayOfObjs => {
  console.log('MODEL postschedules:', manySchedsArrayOfObjs)
  return Schedule.bulkCreate({manySchedsArrayOfObjs})
}

module.exports = scheduleModel
