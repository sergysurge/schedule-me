import { Component, OnInit } from '@angular/core';

import { CompanyService } from '../company.service';
import { AuthService } from '../../auth/auth.service'


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  COMPANYID  = localStorage.getItem('localCompanyId')
  // option = {
  //   service : undefined,
  //   duration : undefined,
  //   description: undefined,
  //   companyId: this.COMPANYID
  // }

  addOption() {
    // let obj = this.authService.getUserAssociations()
    // for (var key in obj){
    //   this.option.companyId = obj[key][0]
    // }
    console.log('gimmie something at least')
    console.log(this.addOptionItem, 'is this good at least?')
    this.companyService.addOptions(this.addOptionItem)
    .subscribe(option=>{
      console.log('end Option', option)
      this.addOptionItem = {
        duration : '',
        description: '',
        service: '',
        companyId: this.COMPANYID
      }
      this.companyService.getOptions(this.COMPANYID)
      .subscribe()
    })
  }


  constructor(private companyService: CompanyService, private authService: AuthService) {
    this.companyService.navigateProfilePageOnRefresh()
    this.companyService.adminCheck()
    this.companyService.getOptions(this.COMPANYID).subscribe()
   }

  ngOnInit() {
  }

  addOptionInit:any = false
  addOptionItem = {
    duration : '',
    description: '',
    service: '',
    companyId: this.COMPANYID
  }

  step0(){
    this.addOptionInit = true
  }

  step1() {
    this.addOptionInit = false
    this.addOption()
  }
}
