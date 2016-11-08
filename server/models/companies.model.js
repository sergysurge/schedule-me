const Company = require('../db').Company
const companiesModel = {}

companiesModel.getonecompany = data => {
  console.log('MODEL getonecompany:', data)
  return Company.findById(data.id)
}

companiesModel.getallcompanies = () => {
  return Company.findAll()
}

companiesModel.postcompany = data => {
  console.log('MODEL postcompany:', data)
  return Company.findOrCreate({
    where: {
      name: data.name
    },
    defaults: {
      name: data.name,
      address: data.address,
      phoneNumber: data.phoneNumber,
      description: data.description,
      website: data.website,
      image: data.image,
      logo: data.logo
    }
  })
  .spread((newComapny, created) => {
    if (created) {
      return {
        success: true,
        message: 'new company created'
      }
    }
    return {
      success: false,
      message: 'company already exists'
    }
  })
}

companiesModel.deletecompany = data => {
  console.log('MODEL deletecompany:', data)
  return Company.destroy({
    where: {
      id: data.id
    }
  })
}

//should be given all values to change
companiesModel.updatecompany = data => {
  console.log('MODEL updatecompany:', data)
  return Company.update({
    name: data.name,
    address: data.address,
    phoneNumber: data.phoneNumber,
    description: data.description,
    website: data.website,
    image: data.image,
    logo: data.logo
  },
    {
      where: {id: data.id}
    })
}
module.exports = companiesModel
