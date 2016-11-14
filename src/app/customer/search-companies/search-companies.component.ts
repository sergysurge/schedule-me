import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../customer.service'

@Component({
  selector: 'app-search-companies',
  templateUrl: './search-companies.component.html',
  styleUrls: ['./search-companies.component.css']
})

export class SearchCompaniesComponent implements OnInit, OnDestroy {
  public companyDataToRender = []
  private companies = []
  private brandNames = []
  private subscription: any

  public defaultImage = 'http://www.freeiconspng.com/uploads/retail-store-icon-15.png'
  constructor(private customerService: CustomerService) { }
  
  ngOnInit() {
    this.subscription = this.customerService.getCompanies()
      .subscribe(
        (results) => {
        
          results[0].forEach((company) => {
            if (!company.image) {
              // add default image if none provided
              company.image = this.defaultImage
            }
          })
          this.companies = results[0]
          this.brandNames = results[1]

          this.companyDataToRender = this.companies.map((company) => {
            let name = null
            for (let i = 0; i < this.brandNames.length; i++) {
              if (this.brandNames[i].id === company.brandNameId) {
                  name = this.brandNames[i].name
              }
              return {
                company: company,
                brandName: name
              }
            }
          })
          console.log(this.companyDataToRender)
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
