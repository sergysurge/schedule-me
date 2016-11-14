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
  private companyArr = []
  private paramId;
  hihi() {
    console.log('hihi')
  }
  populateArray() {
      for (let key in this.company) {
      console.log(key, this.company)
      this.companyArr.push([key, this.company[key]])
    }
    }
   //called before ngOnInit()
  constructor(private companyService:CompanyService, private router:Router, private activatedRoute:ActivatedRoute) {
    console.log(1)
    //makes this private company variable connected with this.companyService.company info i make
    console.log(this.company, 'ngOnInit before')
   this.company = this.companyService.company;
  //  console.log(this.company, 'should be true here : ', this.company === this.companyService.company)
   this.subscription = activatedRoute.params.subscribe(
      (param: any) => {
        this.companyArr = []
        this.paramId = param['id']
        this.companyService.getCompanyById(this.paramId)
        .subscribe((companyInc: any) => {
          console.log(this.company, ' AFTER')
          // this.company = companyInc
          // console.log(companyInc, 'this is company inc, checking if needed sub')
          // console.log(this.companyArr, 'company arr in sub')
          // console.log(this.company, 'company in sub')
        //   console.log(this.companyService.company, 'PROFILE = CONST AFTER Subscription this.service.company')
        //   console.log(this.company, 'PROFILE = CONST AFTER Subscription this.company')
        //   for (let key in companyInc) {
        //   this.companyArr.push([key, companyInc[key]])
        //   }
        })
   })
   //console.log(this.companyService.company, 'logging the console')
  }

  ngOnInit() {
    console.log(2)
    console.log(this.company, 'ngOnInit company')
    this.hihi()
    this.populateArray()
    console.log(this.companyArr, 'company arr on inti')
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
