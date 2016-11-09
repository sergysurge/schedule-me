const companiesModel = require('../models').companiesModel
const companiesController = {}

/* OPTIONS CONTROLLERS CALLS */
companiesController.GETALLOPTIONS = (req, res) => {
  companiesModel.getalloptions()
    .then(alloptions => {
      res.send(alloptions)
    })
    .catch(err => {
      console.log('error in GETALLOPTIONS companyController ', err)
      return err
    })
}

companiesController.POSTONEOPTION = (req, res) => {
  //console.log(req.body, 'req.body POSTONEOPTION, companiesController')
  companiesModel.postoneoption(req.body)
    .then(newOption => {
      res.send(newOption)
    })
    .catch(err => {
      console.log('error in POSTONEOPTION companyController ', err)
      return err
    })
}

companiesController.UPDATEOPTION = (req, res) => {
   //console.log(req.body, 'req.body UPDATEOPTION, companiesController')
  companiesModel.updateoption(req.body)
    .then(updatedOption => {
      console.log('Option Updated :', updatedOption)
      res.send(updatedOption)
    })
    .catch(err => {
      console.log('error in UPDATEOPTION company controller ', err)
      return err
    })
}

companiesController.DELETEOPTION = (req, res) => {
  //console.log(req.body, 'req.body DELETEOPTION, companiesController')
  companiesModel.deleteoption(req.body)
    .then(deletedOption => {
      console.log('Option deleted :', deletedOption)
      res.sendStatus(200)
    })
    .catch(err => {
      console.log('error in DELETEOPTION company controller ', err)
      return err
    })
}
/* OPTIONS CONTROLLERS CALLS END */

/* BRAND NAMES CONTROLLERS CALLS */
companiesController.GETALLBRANDNAMES = (req, res) => {
  companiesModel.getallbrandnames()
    .then(brandNames => {
      res.send(brandNames)
    })
    .catch(err => {
      console.log('error in GETALLBRANDNAMES companyController', err)
      return err
    })
}

companiesController.GETBRANDNAME = (req, res) => {
  //console.log(req.params, 'req.params GETBRANDNAME, companiesController')
  companiesModel.getbrandname(req.params)
    .then(brandNames => {
      res.send(brandNames)
    })
    .catch(err => {
      console.log('error in GETBRANDNAME companyController', err)
      return err
    })
}

companiesController.POSTBRANDNAME = (req, res) => {
  //console.log(req.body, 'req.body POSTBRANDNAME, companiesController')
  companiesModel.postbrandname(req.body)
    .then(newBrand => {
      res.send(newBrand)
    })
    .catch(err => {
      console.log('error in POSTBRANDNAME companyController', err)
      return err
    })
}
/* BRAND NAMES CONTROLLERS CALLS  END*/


companiesController.GETONECOMPANY = (req, res) => {
  //console.log(req.params, 'req.params GETONECOMPANY, companiesController')
  companiesModel.getonecompany(req.params)
    .then(company => {
      //console.log('ABOUT TO SEND ONE COMPANY FROM CONTROLLER ', company)
      res.send(company)
    })
    .catch(err => {
      console.log('error in GETONECOMPANY company controller', err)
      return err
    })
}

companiesController.GETALLCOMPANIES = (req, res) => {
  //console.log('GETALLCOMPANIES, companiesController')
  companiesModel.getallcompanies()
    .then(companies => {
      //console.log('ABOUT TO SEND ALL COMPANIES FROM CONTROLLER ', companies)
      res.send(companies)
    })
    .catch(err => {
      console.log('error in GETALLCOMPANIES company controller', err)
      return err
    })
}

companiesController.POSTCOMPANY = (req, res) => {
  //console.log(req.body, 'req.body POSTCOMPANY, companiesController')
  companiesModel.postcompany(req.body)
    .then(data => {
      console.log('Company created :', data)
      res.send(data)
    })
    .catch(err => {
      console.log('error in POSTCOMPANY company controller', err)
      return err
    })
}

companiesController.DELETECOMPANY = (req, res) => {
  //console.log(req.body, 'req.body DELETECOMPANY, companiesController')
  companiesModel.deletecompany(req.body)
    .then(data => {
      console.log('Company deleted :', data)
      res.sendStatus(200)
    })
    .catch(err => {
      console.log('error in DELETECOMPANY company controller', err)
      return err
    })
}

//update company using a form, **VALUES NOT CHANGED OR BLANK, SHOULD AUTOPOPULATE BEFORE SENT HERE!!
//SHOULD ADD A ID TO THE req.body as ID; 1 ;
companiesController.UPDATECOMPANY = (req, res) => {
  //console.log(req.body, 'req.body UPDATECOMPANY, companiesController')
  companiesModel.updatecompany(req.body)
    .then(data => {
      console.log('Company Updated :', data)
      res.send(data)
    })
    .catch(err => {
      console.log('error in UPDATECOMPANY company controller', err)
      return err
    })
}

module.exports = companiesController
