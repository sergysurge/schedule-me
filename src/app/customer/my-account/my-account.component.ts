import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit, OnDestroy {

  public showEditBox: boolean = false
  public user: any
  private defaultImage: string = 'http://www.clker.com/cliparts/B/R/Y/m/P/e/blank-profile-md.png'
  private subscription: any
  private userId: number = Number(localStorage.getItem('userId'))

  @Output() userDetails = new EventEmitter<any>() 

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
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

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe()
  }

  onEdit() {
    // this.showEditBox = !this.showEditBox
    this.router.navigate(['users/account/edit'])
    // this.userDetails.emit(user)
  }

  onUserUpdated(user) {
    this.user = user
  }

}
