import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { CompanyService } from '../company.service';
import { Subscription } from "rxjs/Rx";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnDestroy, OnInit{
  private subscription: Subscription
  private company: any
  private paramId

  
  private brandNameCustom
  private selectedBrandNamesAll = {
    id: false,
    name: '',

  }

  companySelectedBrandNamesAll(id, name) {
    this.selectedBrandNamesAll.id = id
    this.selectedBrandNamesAll.name = name
    console.log(this.selectedBrandNamesAll, 'from companySelectedBrandNamesAll')
  }
  
  companyGetAllBrandNames() {
    this.companyService.getAllBrandNames()
      .subscribe(data => console.log(data, "from companyGetAllBrandNames"))
  } 
  //sets brand name, people should then first click this then update/create profile
  companySetBrand() {
    this.companyService.company.BrandNameId = this.selectedBrandNamesAll.id
  }

  companyPostBrandName() {
    let body = {
      name: this.brandNamePostForm.value.brandNameCustom
    }
    this.companyService.postBrandName(body)
    .subscribe(data => {
      this.companyService.brandNamesAll = []
      this.companyGetAllBrandNames()
      console.log(data, "from ")
  })
  }
  /* profile component methods and variables */
  companyUpdateProfile() {
    let tempBrandName = this.companyService.company.brandName
    let body = {
      id: this.profileUpdateForm.value.id || this.companyService.company.id,
      name: this.profileUpdateForm.value.name || this.companyService.company.name,
      address: this.profileUpdateForm.value.address || this.companyService.company.address,
      phoneNumber: this.profileUpdateForm.value.phoneNumber || this.companyService.company.phoneNumber,
      description: this.profileUpdateForm.value.description || this.companyService.company.description,
      website: this.profileUpdateForm.value.website || this.companyService.company.website,
      image: this.profileUpdateForm.value.image || this.companyService.company.image,
      logo: this.profileUpdateForm.value.logo || this.companyService.company.logo,
      BrandNameId: this.profileUpdateForm.value.BrandNameId || this.companyService.company.BrandNameId
    }
    this.companyService.updateProfile(body)
      .subscribe(data => {
        if (data.status === 200) {
          this.companyService.company = body
          this.companyService.company.brandName = tempBrandName
          console.log(data.status, 'company updated')
        }
        else (console.log('inccorrent updating'))

      })
  }



  /* end of profile component methods and variables */

  private brandNamePostForm : FormGroup
  private profileUpdateForm : FormGroup
   /* called before ngOnInit() */
  constructor(private companyService:CompanyService, private router:Router, private activatedRoute:ActivatedRoute, private formBuilder: FormBuilder) {

    /* IF CLIENT REFRESHES ON EMPLOYEES/SCHEDULES/OPTIONS THE LOGO AND OTHER INFORMATION 
    DELETES.      **IF USER REFRESHES ON THOSE PAGES, WE SEND EM BACK TO COMPANY/1 */

    

    /*ON company/# path, # of companyId gets rendered*/
   this.company = this.companyService.company;
   this.subscription = activatedRoute.params.subscribe(
      (param: any) => {
        this.paramId = param['id']
        localStorage.setItem('localCompanyId', this.paramId)
        this.companyService.getCompanyById(this.paramId)
          .subscribe((companyInc: any) => {

          this.companyService.profileUpdateControl()
          console.log(this.companyService.profileUpdate, 'profile updated or not')
          //console.log(this.company, ' AFTER')
        })
   })

   /* getting all brandNames available */
   this.companyGetAllBrandNames()

   /* brandNamePostForm goes here */
   this.brandNamePostForm = formBuilder.group({
     'brandNameCustom': [this.brandNameCustom, Validators.required]
   })

   /* profileUpdateForm goes here */
   this.profileUpdateForm = formBuilder.group({
      'BrandNameId': [this.companyService.company.BrandNameId, Validators.required],
      //'brandName': [this.companyService.company.brandName, Validators.required],
      'address': [this.companyService.company.address, Validators.required],
      'description': [this.companyService.company.description, Validators.required],
      'id': [this.companyService.company.id, Validators.required],
      'image': [this.companyService.company.image, Validators.required],
      'logo': [this.companyService.company.logo, Validators.required],
      'name': [this.companyService.company.name, Validators.required],
      'phoneNumber': [this.companyService.company.phoneNumber, Validators.required],
      'website': [this.companyService.company.website, Validators.required]
   })

   }


  ngOnInit() {
    this.companyService.adminCheck()
    this.companyService.profileUpdateControl()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
