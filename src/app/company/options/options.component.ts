import { Component, OnInit } from '@angular/core';

import { CompanyService } from '../company.service';
import { AuthService } from '../../auth/auth.service'


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  option = {
    service : undefined,
    duration : undefined,
    description: undefined,
    companyId: undefined
  }

  addOption() {
    let obj = this.authService.getUserAssociations()
    for (var key in obj){
      this.option.companyId = obj[key][0]
    }
    this.companyService.addOptions(this.option)
    .subscribe(option=>{
      console.log('end Option', option)
    })
  }


  constructor(private companyService: CompanyService, private authService: AuthService) {
    this.companyService.navigateProfilePageOnRefresh()
    this.companyService.adminCheck()
   }

  ngOnInit() {
  }

}
