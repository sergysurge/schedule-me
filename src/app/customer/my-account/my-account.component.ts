import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-my-account',
  template: `
    <p>
      my-account Works!
    </p>
    <h3>My Account</h3>
    <div id="profile">
      <div id="name">{{}}</div>
      <img src="{{}}">
    </div>
  `,
  styles: [
    `
      #profile {

      }
    `
  ]
})
export class MyAccountComponent implements OnInit, OnDestroy {

  public user: any
  private subscription: any
  private userId: number = Number(localStorage.getItem('userId'))
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    // this.subscription = this.customerService.getUserInformation(this.userId)
    //   .subscribe(
    //     (user) => {this.user = user},
    //     (err) => {console.error(err)},
    //     () => {console.log('done')}
    //   )
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe()
  }

}
