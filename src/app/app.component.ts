import { Component } from '@angular/core';
import { AppServiceService } from './app-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (appServiceService: AppServiceService) { 
    appServiceService.getCompanies()
      .subscribe(
        companies => this.companies = companies.json()
        // companies => this.companies = companies
      )
  }
  title = 'app works!';
  companies;
}
