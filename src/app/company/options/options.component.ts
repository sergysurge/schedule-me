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
  addOptionInit:any = false
  addOptionItem = {
    duration : '',
    description: '',
    service: '',
    companyId: this.COMPANYID
  }

  addOption() {
    this.companyService.addOptions(this.addOptionItem)
    .subscribe(option=>{
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

  step0(){
    this.addOptionInit = true
  }

  step1() {
    this.addOptionInit = false
    this.addOption()
  }
}
