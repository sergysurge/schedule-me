const express = require('express')

const schedulesController = require('../controllers/schedules.controller')

var SchedulesRouter = express.Router()

SchedulesRouter.get('/', schedulesController.GETSCHEDULES)
SchedulesRouter.get('/:userCompanyId', schedulesController.GETONESCHEDULE)
SchedulesRouter.post('/oneschedule', schedulesController.POSTONESCHEDULE)
SchedulesRouter.post('/schedules', schedulesController.POSTSCHEDULES)

module.exports = SchedulesRouter
