import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Rx'
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit, OnDestroy {

  public user: any //this.customerService.user
  public userPicture: string = 'http://www.clker.com/cliparts/B/R/Y/m/P/e/blank-profile-md.png'
  private userId: number = Number(localStorage.getItem('userId'))
  private subscription: Subscription
  private userSubscription: Subscription

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.customerService.getUser()
      .subscribe(
        (user) => {
          this.user = user
          if (this.user.image) {
            this.userPicture = this.user.image
          }
        },
        (err) => { console.log(err) }
      )
    if (!this.user) {
      this.subscription = this.customerService.getUserInformation(this.userId, null)
        .subscribe(
          (result) => {
            if (result.response.success) {
              this.user = result.response.user
              if (this.user.image) {
                this.userPicture = this.user.image
              }
            }
          },
          (err) => { console.log(err) } 
        )
    }
  }
  
  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe()
    this.userSubscription && this.userSubscription.unsubscribe()
  }

}
