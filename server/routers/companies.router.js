const express = require('express')

const companiesController = require('../controllers/companies.controller')

var CompaniesRouter = express.Router()

CompaniesRouter.get('/getonecompany/:id', companiesController.GETONECOMPANY)
CompaniesRouter.get('/getallcompanies', companiesController.GETALLCOMPANIES)
CompaniesRouter.post('/postcompany', companiesController.POSTCOMPANY)
CompaniesRouter.delete('/deletecompany', companiesController.DELETECOMPANY)
CompaniesRouter.put('/updatecompany', companiesController.UPDATECOMPANY)

/* BRAND NAMES CONTROLLERS CALLS */
CompaniesRouter.put('/updateorsetbrandname', companiesController.UPDATEORSETBRANDNAME)
CompaniesRouter.get('/getallbrandnames', companiesController.GETALLBRANDNAMES)
CompaniesRouter.get('/getbrandname/:val', companiesController.GETBRANDNAME)
CompaniesRouter.post('/postbrandname', companiesController.POSTBRANDNAME)

/* OPTIONS CONTROLLERS CALLS */
CompaniesRouter.get('/getalloptions/:companyId', companiesController.GETALLOPTIONS)
CompaniesRouter.post('/postoneoption', companiesController.POSTONEOPTION)
CompaniesRouter.put('/updateoption', companiesController.UPDATEOPTION)
CompaniesRouter.delete('/deleteoption', companiesController.DELETEOPTION)



module.exports = CompaniesRouter
