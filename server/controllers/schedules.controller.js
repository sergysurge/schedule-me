const scheduleModel = require('../models').scheduleModel
const schedulesController = {}

//req.params should send user_company_id
//should be used with user_controller get company id
schedulesController.GETONESCHEDULE = (req, res) => {
  //console.log(req.params, 'req.params GETONESCHEDULE, schedulesController')
  scheduleModel.getoneschedule(req.params)
    .then(schedule => {
      //console.log('ABOUT TO SEND ONE SCHEDULE FROM CONTROLLER ', schedule)
      res.send(schedule)
    })
    .catch(err => {
      console.log('error in GETONESCHEDULE scheduleController', err)
      return err
    })
}

//should send the user_company_id as array [1,2,3]
schedulesController.GETSCHEDULES = (req, res) => {
  //console.log(req.params. 'req.params GETSCHEDULES, scheduleController')
  scheduleModel.getschedules(req.params)
    .then(schedules => {
      //console.log('ABOUT TO SEND ALL Schedules FROM scheduleController ', schedules)
      res.send(schedules)
    })
    .catch(err => {
      console.log('error in GETSCHEDULES scheduleController', err)
      return err
    })
}

//PROMT TO SELECT USER-WORKER (employee), grab usercompanyid
//THEN POST SCHEDULE FOR HIM/her
schedulesController.POSTONESCHEDULE = (req, res) => {
  //console.log(req.body, 'req.body POSTONESCHEDULE, schedulesController')
  scheduleModel.postoneschedule(req.body)
    .then(userSched => {
      console.log('Schedule created :', userSched)
      res.send(userSched)
    })
    .catch(err => {
      console.log('error in POSTONESCHEDULE schedulesController :', err)
      return err
    })
}

//POST MANY SCHEDULES CAUSE YOU ARE A BOSS
//EACH OBJ IN ARRAY SHOULD CONTAIN A user_company_id
schedulesController.POSTSCHEDULES = (req, res) => {
  //console.log(req.body, 'req.body POSTSCHEDULES, schedulesController')
  scheduleModel.postschedules(req.body)
    .then(data => {
      console.log('Schedules created :', data)
      res.send(data)
    })
    .catch(err => {
      console.log('error in POSTSCHEDULES schedulesController', err)
      return err
    })
}



module.exports = schedulesController
