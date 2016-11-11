import { Component } from '@angular/core';
import { AppServiceService } from './app-service.service';
import { NgForm } from "@angular/forms";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  onSubmit(form:NgForm) {
    console.log('working now ; ', form)
  }
  constructor (appServiceService: AppServiceService) { 
    appServiceService.getCompanies()
      .subscribe(
        companies => this.companies = companies.json()
        // companies => this.companies = companies
      )
  }
  title = 'app works!';
  companies;
  trial;
}
