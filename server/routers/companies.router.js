const express = require('express')

const companiesController = require('../controllers/companies.controller')

var CompaniesRouter = express.Router()

CompaniesRouter.get('/getonecompany/:id', companiesController.GETONECOMPANY)
CompaniesRouter.get('/getallcompanies', companiesController.GETALLCOMPANIES)
CompaniesRouter.post('/postcompany', companiesController.POSTCOMPANY)
CompaniesRouter.post('/deletecompany', companiesController.DELETECOMPANY)
CompaniesRouter.post('/updatecompany', companiesController.UPDATECOMPANY)

/* BRAND NAMES CONTROLLERS CALLS */

CompaniesRouter.get('/getallbrandnames', companiesController.GETALLBRANDNAMES)
CompaniesRouter.get('/getbrandname/:val', companiesController.GETBRANDNAME)
CompaniesRouter.post('/postbrandname', companiesController.POSTBRANDNAME)
module.exports = CompaniesRouter
