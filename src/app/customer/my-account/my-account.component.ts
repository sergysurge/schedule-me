import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit, OnDestroy {

  public user: any //this.customerService.user
  private defaultImage: string = 'http://www.clker.com/cliparts/B/R/Y/m/P/e/blank-profile-md.png'
  private userId: number = Number(localStorage.getItem('userId'))
  private subscription: any
  private userSubscription

  constructor(private customerService: CustomerService, private router: Router) { 
    this.userSubscription = this.customerService.getUser()
      .subscribe(
        (user) => {this.user = user},
        (err) => {console.log(err)}
      )
  }

  ngOnInit() {
    if (!this.user) {
      this.subscription = this.customerService.getUserInformation(this.userId, null)
        .subscribe(
          (result) => {
            if (result.response.success) {
              this.user = result.response.user
              if (!this.user.image) {
                this.user.image = this.defaultImage
              }
            }
          },
          (err) => {console.error(err)},
          () => {console.log('done')}
        )
    }
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe()
    this.userSubscription && this.userSubscription.unsubscribe()
  }

  onEdit() {
    this.router.navigate(['users/account/edit'])
  }


}
