import { Component, OnDestroy, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
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
  private brands: Subscription
  private brandNamesAll: any
  private brandNameCustom
  postBrandName(brandNameCustom) {
    let body = {
      name: brandNameCustom,
      companyId: localStorage.getItem('companyId') || 1
    }
    this.companyService.postBrandName(body)
    .subscribe(data => console.log(data))
  }
   //called before ngOnInit()
  constructor(private companyService:CompanyService, private router:Router, private activatedRoute:ActivatedRoute) {
   this.company = this.companyService.company;
   this.subscription = activatedRoute.params.subscribe(
      (param: any) => {
        this.paramId = param['id']
        this.companyService.getCompanyById(this.paramId)
        .subscribe((companyInc: any) => {
          //console.log(this.company, ' AFTER')
        })
   })
   this.brandNamesAll = this.companyService.brandNamesAll
   this.brands = this.companyService.getAllBrandNames()
   .subscribe(data => console.log(data, "in profile component"))

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
