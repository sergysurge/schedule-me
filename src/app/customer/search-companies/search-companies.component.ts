import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../customer.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-search-companies',
  templateUrl: './search-companies.component.html',
  styleUrls: ['./search-companies.component.css']
})

export class SearchCompaniesComponent implements OnInit, OnDestroy {
  // public companyDataToRender = []
  private companies = []
  private subscription: any

  public defaultImage = 'http://www.freeiconspng.com/uploads/retail-store-icon-15.png'
  constructor(private customerService: CustomerService, private router: Router) { }
  
  ngOnInit() {
    this.subscription = this.customerService.getCompanies()
      .subscribe(
        (companies) => {
        
          companies.forEach((company) => {
            if (!company.image) {
              // add default image if none provided
              company.image = this.defaultImage
            }
          })
          this.companies = companies
        },
        (err) => console.error(err),
        () => console.log('done')
      )
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe()
  }

  onCompanyClick(company) {
    this.router.navigate(['/users/search/', company.id])
  }
}
