const express = require('express')

const companiesController = require('../controllers/companies.controller')

var CompaniesRouter = express.Router()

CompaniesRouter.get('/', companiesController.GET)
CompaniesRouter.post('/', companiesController.POST)

module.exports = CompaniesRouter
