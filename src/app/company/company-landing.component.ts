import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Response } from "@angular/http";
import { CompanyService } from './company.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-company-landing',
  templateUrl: './company-landing.component.html',
  styles: [
    `
    .companyProfilePic {
  /*background-image: url('../assets/flowers-desk-office-vintage.jpg');*/
    /*background-repeat: no-repeat;
    background-position: center;
    background-size:cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;*/
    /*height:400px;*/
    overflow: visible;
}

.companyLogo {

  max-height: 100px;
  max-width: 200px;
}

.compDesc {
  list-style: none;
  margin: auto;
}

.adminCompModules:hover {
  background-color: #008ea8;
  color: white;
  margin-bottom : 5px;
}

.adminCompModules:hover li {
  background-color: #008ea8;
  color: white;
}

.down20 {
  position: relative;
  top: 20px;
}

.down40 {
  position: relative;
  top: 40px;
}

.down80 {
  position: relative;
  top: 80px;
}
/*grey a5a5af*/
/*blue 77c9d4*/
.sergNav {
  background-color: #57bc90;
  color: white;
}

.sergNav a {
  color: #015249;
}

.sergNav a:hover {
  color: #57bc90;
}

.sergNav a:active {
  color: white;
  background-color: #57bc90;
}

.sergPanelBody {

  background-color: #007ea7;
  color: white;
}`
  ]
})
export class CompanyLandingComponent implements OnInit {

  navigateToCompany(companyId) {
  this.router.navigate(['/admin/company', companyId])
  }

  // ADD COMPANY STEP 0 BUTTON

  startedAddCompany = false
  step0 = true
  step0to1() {
    this.step0 = false
    this.startedAddCompany = true
    this.step1 = true
    this.companyService.company = []
    this.companyGetAllBrandNames()
  }

  // STEP 1 SELECTING BRAND NAME OR CREATING ONE 
  step1 = false
  companyGetAllBrandNames() {
    this.companyService.getAllBrandNames()
      .subscribe(data => console.log(data, "from companyGetAllBrandNames"))
  } 
  private brandNameCustom = ''
  private selectedBrandNamesAll = {
    id: false,
    name: '',
  }
  companySelectedBrandNamesAll(id, name) {
    this.selectedBrandNamesAll.id = id
    this.selectedBrandNamesAll.name = name
    console.log(this.selectedBrandNamesAll, 'from companySelectedBrandNamesAll')
  }
  //sets brand name, people should then first click this then update/create profile
  companySetBrand() {
    this.companyService.company.BrandNameId = this.selectedBrandNamesAll.id
    this.step1to2()
  }

  // POSTS BRAND NAME
  private brandNameExists
  companyPostBrandName() {
    let body = {
      name: this.brandNameCustom
    }
    this.companyService.postBrandName(body)
    .subscribe(data => {
      console.log(data, '**LOOK** .id?')
      if (data.success === true) {
        this.companyService.brandNamesAll = []
        this.companyGetAllBrandNames()
        this.brandNameExists = 'no'
      } else {
        this.brandNameExists = 'yes'
      }
  })
  }
  step1to2() {
    this.step1 = false
    this.step2 = true
  }
  //step 2
  step2 = false
  companyUpdateProfile() {
    let body = {
      name: this.companyService.company.name,
      address:  this.companyService.company.address,
      phoneNumber: this.companyService.company.phoneNumber,
      description: this.companyService.company.description,
      website: this.companyService.company.website,
      image: this.companyService.company.image ,
      logo: this.companyService.company.logo,
      BrandNameId: this.companyService.company.BrandNameId.toString()
    }
    console.log(body, 'dis da body we get')
    this.companyService.postProfile(body)
      .subscribe(data => {
        console.log(data, "wow fucking idiot")
        if (data.status === 200) {
          this.companyService.getOneBrandNameAddCompany(this.companyService.company.BrandNameId)
          .subscribe(data=> {
          this.companyService.addEmployee({
            userId : localStorage.getItem('userId'),
            companyId : this.companyService.company.id,
            isAdmin : true
          })
          .subscribe( data => {
            console.log('hope its true!!!')
            this.step2to3()
          })
          console.log(data, 'company updated')
          }
          )
        }
        else (console.log('inccorrent updating'))
      
    })
  }

  step2to3() {
    this.step2 = false
    this.startedAddCompany = false
    console.log('SHOULD BE GOING TO COMPANY PAGE!')
    this.router.navigate(['/admin/company', this.companyService.company.id])
    // this.router.navigate('admin')
  }

  addCompanyForm : FormGroup
  
  constructor(private companyService: CompanyService, private router: Router, private formBuilder: FormBuilder) {
    this.companyService.getAllCompaniesByUserId(localStorage.getItem('userId'))
      .subscribe(data => console.log(data, 'logging the data in constructure company service'))

      /* FORM addCompany */
      this.addCompanyForm = formBuilder.group({
        'name' : [this.companyService.company.name, Validators.required],
        'address' : [this.companyService.company.address, Validators.required],
        'BrandNameId' : [this.companyService.company.BrandNameId, Validators.required],
        'phoneNumber' : [this.companyService.company.phoneNumber, Validators.required],
        'website' : [this.companyService.company.website, Validators.required], 
        'image' : [this.companyService.company.image || 'http://www.clker.com/cliparts/B/R/Y/m/P/e/blank-profile-md.png', Validators.required],
        'logo' : [this.companyService.company.logo || 'http://www.clker.com/cliparts/B/R/Y/m/P/e/blank-profile-md.png', Validators.required],
        'description' : [this.companyService.company.description, Validators.required]
      })
      /* FORM addCompany END */

      
   }   

  ngOnInit() {
  }

}
