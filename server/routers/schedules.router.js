const express = require('express')

const schedulesController = require('../controllers').schedulesController

var SchedulesRouter = express.Router()

SchedulesRouter.get('/oneschedule', schedulesController.GETONESCHEDULE)
SchedulesRouter.get('/schedules', schedulesController.GETSCHEDULES)
SchedulesRouter.post('/oneschedule', schedulesController.POSTONESCHEDULE)
SchedulesRouter.post('/schedules', schedulesController.POSTSCHEDULES)

module.exports = SchedulesRouter
