import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../customer.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-search-companies',
  templateUrl: './search-companies.component.html',
  styleUrls: ['./search-companies.component.css']
})

export class SearchCompaniesComponent implements OnInit, OnDestroy {

  private companies = []
  private subscription: any

  public defaultCompanyImage = 'http://www.freeiconspng.com/uploads/retail-store-icon-15.png'
  constructor(private customerService: CustomerService, private router: Router) { }
  
  ngOnInit() {
    this.subscription = this.customerService.getCompanies()
      .subscribe(
        (companies) => {
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
    this.customerService.setCompanyId(company.id)
    this.router.navigate(['/users/search/', company.id])
  }
}
