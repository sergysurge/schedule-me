const Company = require('../db').Company
const BrandName = require('../db').BrandName
const Option = require('../db').Option
const companiesModel = {}

/*            OPTIONS             */
companiesModel.getalloptions = (companyId) => {
  return Option.findAll({
    where: {
      companyId: companyId
    }
  })
  .then(options => {
    return options
  })
}

companiesModel.postoneoption = (option) => {
  return Option.findOrCreate({
    where: {
      service: option.service
    },
    defaults: {
      duration: option.duration,
      service: option.service,
      description: option.description,
      companyId: option.companyId
    }
  })
  .spread((newOption, created) => {
    if (created) {
      return {
        success: true,
        message: 'Option Created : ' + option.name
      }
    }
    return {
      success: false,
      message: 'Option ' + option.name + ' Already Exists, please make a new Option'
    }
  })
}

companiesModel.updateoption = option => {
  return Option.update({
    duration: option.duration,
    service: option.service,
    description: option.description,
    companyId: option.companyId,
    id: option.id
  },
    {
      where: {
        id: option.id
      }
    })
}

companiesModel.deleteoption = option => {
  return Option.destroy({
    where: {
      id: option.id
    }
  })
}

/*            OPTIONS END             */

/*            BRAND NAMES             */
//**done
companiesModel.getallbrandnames = () => {
  return BrandName.findAll()
}


// companiesModel.updateorsetbrandname = (body) => {
//   let brandId = body.brandId
//   let brandName = body.brandName
//   let companyId = body.companyId
//   BrandName.upsert({
//     id: brandId,
//     name: brandName,
//     companyId: companyId
//   })
//   .then(data => console.log(data, '**** what are we getting back asdf'))
//   .catch(err => console.log(err, 'error in updateorsetbrandname'))
// }


//SEARCH BRAND NAME BY ID or STRING, NOT FULL STRING
//**Done
companiesModel.getbrandname = brand => {
  console.log(brand, '***brand')
  if (Number(brand.val)) {
    return BrandName.findOne({
      where: {id: brand.val},
      include: [{model: Company}]
    })
  } else {
    return BrandName.findAll({
      where: {name: {$ilike: '%' + brand.val + '%'}}
    })
  }
}
//**DONE
companiesModel.postbrandname = brandName => {
  return BrandName.findOrCreate({
    where: {
      $or: [
        { name: brandName.name },
        { id: brandName.id }
      ]
    },
    defaults: {
      name: brandName.name
    }
  })
  .spread((newBrandName, created) => {
    if (created) {
      return {
        success: true,
        message: 'Brand Name Created'
      }
    }
    return {
      success: false,
      message: 'Brand Name Already Exists, please make a new Brand Name'
    }
  })
}
/*            BRAND NAMES END             */

/*            COMPANY             */
//**DONE
companiesModel.getonecompany = data => {
  console.log('MODEL getonecompany:', data)
  return Company.find({
    where: {id: data.id},
    include: [{all: true}]
  })
}
//**DONE
companiesModel.getallcompanies = () => {
  return Company.findAll({
    include: [{ all: true }]
  })
}
//**DONE
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
      logo: data.logo,
      BrandNameId: data.BrandNameId
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
//**DONE
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
  return Company.upsert({
    id: data.id,
    name: data.name,
    address: data.address,
    phoneNumber: data.phoneNumber,
    description: data.description,
    website: data.website,
    image: data.image,
    logo: data.logo,
    BrandNameId: data.BrandNameId
  })
}

/*            COMPANY END             */
module.exports = companiesModel
