import { Component, OnDestroy, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { CompanyService } from '../company.service';
import { Subscription } from "rxjs/Rx";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

//
export class ProfileComponent implements OnDestroy, OnInit{
  private subscription: Subscription
  private company: any
  private paramId

  
  private brandNameCustom
  private selectedBrandNamesAll = {
    id: false,
    name: ''
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

  companyPostBrandName() {
    let body = {
      name: this.brandNamePostForm.value.brandNameCustom
    }
    console.log(body)
    console.log(this.brandNamePostForm.value.brandNameCustom)
    this.companyService.postBrandName(body)
    .subscribe(data => console.log(data, "from "))
  }

  private brandNamePostForm : FormGroup

   /* called before ngOnInit() */
  constructor(private companyService:CompanyService, private router:Router, private activatedRoute:ActivatedRoute, private formBuilder: FormBuilder) {

    /*ON company/# path, # of companyId gets rendered*/
   this.company = this.companyService.company;
   this.subscription = activatedRoute.params.subscribe(
      (param: any) => {
        this.paramId = param['id']
        this.companyService.getCompanyById(this.paramId)
          .subscribe((companyInc: any) => {
          //console.log(this.company, ' AFTER')
        })
   })

   /* getting all brandNames available */
   this.companyGetAllBrandNames()

   /* brandNamePostForm goes here */
   this.brandNamePostForm = formBuilder.group({
     'brandNameCustom': [this.brandNameCustom, Validators.required]
   })
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
