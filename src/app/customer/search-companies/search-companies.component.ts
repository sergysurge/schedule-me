import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../customer.service'
// import { CompanyFilter } from '.../shared/company.pipe'
@Component({
  selector: 'app-search-companies',
  templateUrl: './search-companies.component.html',
  styleUrls: ['./search-companies.component.css']
})

export class SearchCompaniesComponent implements OnInit, OnDestroy {
  public allCompanies = []
  private subscription: any

  public defaultImage = 'http://www.freeiconspng.com/uploads/retail-store-icon-15.png'
  constructor(private customerService: CustomerService) { }
  
  ngOnInit() {
    this.subscription = this.customerService.getCompanies()
      .subscribe(
        (companies) => {
          companies.forEach((company) => {
            if (!company.image) {
              company.image = this.defaultImage
            }
          })
          console.log(companies)
          this.allCompanies = companies
        },
        (err) => console.error(err),
        () => console.log('done')
      )
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
