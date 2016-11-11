const Schedule = require('../db').Schedule

const scheduleModel = {}

scheduleModel.getoneschedule = userCompanyId => {
  // console.log('MODEL getoneschedule:', userCompanyId)
  return Schedule.findAll({
    where: {
      UserCompanyId: userCompanyId
    }
  })
  .then((schedules) => {
    return schedules
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
    comment: userSched.comment,
    UserCompanyId: userSched.UserCompanyId
  })
}

scheduleModel.postschedules = manySchedsArrayOfObjs => {
  console.log('MODEL postschedules:', manySchedsArrayOfObjs)
  return Schedule.bulkCreate({manySchedsArrayOfObjs})
}

module.exports = scheduleModel
