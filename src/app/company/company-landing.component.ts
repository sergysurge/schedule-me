import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Response } from "@angular/http";
import { CompanyService } from './company.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-company-landing',
  template: `
    <div class="panel panel-default container-fluid">
      <div class="panel-heading col-sm-12 sergPanelBody">
          <div class="panel-title">
              <h1 *ngIf="startedAddCompany" class="text-center"> Create a Company </h1>
              <h1 *ngIf="!startedAddCompany">Your Companies 
              <button  *ngIf="step0" class="btn btn-default" type="submit" (click)="step0to1()"> <span class="glyphicon glyphicon-plus-sign" > </span>
              Add Company </button>  
              </h1>
          </div>
      <div>

      <div class="panel-body col-sm-12">

      <div *ngIf="step1" class="col-sm-12">
        <div class="col-sm-6">
          <h3> Select a Brand Name </h3>
            <p *ngIf="selectedBrandNamesAll.id"> Selected : {{selectedBrandNamesAll.id}} {{selectedBrandNamesAll.name}} </p> 
          <select multiple class="form-control">
              <option *ngFor="let b of companyService.brandNamesAll" (click)="companySelectedBrandNamesAll(b.id, b.name)"> {{b.id}} {{b.name}} </option>
          </select>
          <button class="btn btn-default col-sm-offset-2 col-sm-2" [disabled]="selectedBrandNamesAll.id === false" (click)="companySetBrand()"> select brand </button>
        </div>
        <div class="col-sm-6">
          <h3> Create a Brand Not Listed</h3>
          <p *ngIf="selectedBrandNamesAll.id"> Selected : {{selectedBrandNamesAll.id}} {{selectedBrandNamesAll.name}} </p> 
          <input [(ngModel)]="brandNameCustom" placeholder="Your Brand Name Here">
          <button class="btn btn-default" [disabled]="brandNameCustom === ''" (click)="companyPostBrandName()">CREATE!</button>
          <h3 *ngIf="brandNameExists === 'no'"> Success! </h3>
          <p *ngIf="brandNameExists === 'no'"> Please find your brand name in the list and submit! </p>
          <h3 *ngIf="brandNameExists === 'yes'"> Brand exists! Try Again! </h3>
        </div>
      </div> 

      <div *ngIf="step2" class="col-sm-12">
        <h3> Setting Up Your Profile </h3>
        <p> We just need some more information </p>
        
        <form class="form horizontal" [formGroup]="addCompanyForm" (ngSubmit)="companyUpdateProfile()">
          <div class="form-group">
          <label for="BrandNameId" class="col-sm-2 control-label">BrandNameId</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" aria-describedby="helpBlock" id="BrandNameId" [value]="this.companyService.company.BrandNameId" formControlName="BrandNameId">
          <span class="help-block" id="helpBlock"> enter your BrandNameId here</span>
        </div>
        <label for="address" class="col-sm-2 control-label">address</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" aria-describedby="helpBlock" id="address" [(ngModel)]="this.companyService.company.address" formControlName="address">
          <span class="help-block" id="helpBlock"> enter your address here</span> {{this.companyService.company.address}}
        </div>
        <label for="description" class="col-sm-2 control-label">description</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" aria-describedby="helpBlock" id="description" [(ngModel)]="this.companyService.company.description" formControlName="description">
          <span class="help-block" id="helpBlock"> enter your description here</span>
        </div>
        
        <label for="image" class="col-sm-2 control-label">image</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" aria-describedby="helpBlock" id="image" [(ngModel)]="this.companyService.company.image" formControlName="image">
          <span class="help-block" id="helpBlock"> enter your image here</span>
        </div>
        <label for="logo" class="col-sm-2 control-label">logo</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" aria-describedby="helpBlock" id="logo" [(ngModel)]="this.companyService.company.logo" formControlName="logo">
          <span class="help-block" id="helpBlock"> enter your logo here</span>
        </div>
         <label for="name" class="col-sm-2 control-label">name</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" aria-describedby="helpBlock" id="name" [(ngModel)]="this.companyService.company.name" formControlName="name">
          <span class="help-block" id="helpBlock"> enter your store name here</span>
        </div>
        <label for="phoneNumber" class="col-sm-2 control-label">phoneNumber</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" aria-describedby="helpBlock" id="phoneNumber" [(ngModel)]="this.companyService.company.phoneNumber" formControlName="phoneNumber">
          <span class="help-block" id="helpBlock"> enter your phoneNumber here</span>
        </div>
        <label for="website" class="col-sm-2 control-label">website</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" aria-describedby="helpBlock" id="website" [(ngModel)]="this.companyService.company.website" formControlName="website">
          <span class="help-block" id="helpBlock"> enter your website here</span>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-default" > create </button>
        </div>
          </div>
        </form>

        <div
      </div>
      <div class="col-sm-12" *ngIf="!startedAddCompany">
        <ul>
          <li *ngFor="let compies of this.companyService.companiesLanding" (click)="navigateToCompany(compies.id)">
          {{compies.name}}
          {{compies.address}}
          </li>
        </ul>
      </div>
      </div>
    </div>
  `,
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
      image: this.companyService.company.image || 'http://www.clker.com/cliparts/B/R/Y/m/P/e/blank-profile-md.png',
      logo: this.companyService.company.logo || 'http://www.clker.com/cliparts/B/R/Y/m/P/e/blank-profile-md.png',
      BrandNameId: this.companyService.company.BrandNameId
    }
    this.companyService.updateProfile(body)
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
