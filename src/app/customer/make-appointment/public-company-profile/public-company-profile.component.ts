import { Component, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CustomerService } from '../../customer.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-public-company-profile',
  templateUrl: './public-company-profile.component.html',
  styleUrls: ['./public-company-profile.component.css']
})
export class PublicCompanyProfileComponent implements OnDestroy, OnChanges {

  public company: any
  public logoImage: string 
  public companyImage: string = 'http://www.freeiconspng.com/uploads/retail-store-icon-15.png'
  private companySubscription: any
  @Input() companyId: any
  
  constructor(private customerService: CustomerService) { }

  ngOnChanges(changes: SimpleChanges) { 
    console.log(changes, 'chanages')
    let newId = changes['companyId'].currentValue
    if (newId) {
      this.companySubscription = this.customerService.getCompanyById(newId)
        .subscribe(
          (company) => { 
            this.company = company
            this.company.image && (this.companyImage = this.company.image)
            this.company.logo && (this.logoImage = this.company.logo)
            console.log(this.company, 'comp')
          },
          (err) => {  console.log(err) }
        )
    }
  }

  ngOnDestroy() {
    this.companySubscription && this.companySubscription.unsubscribe()
  }

}
