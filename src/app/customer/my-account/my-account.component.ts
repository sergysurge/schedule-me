import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-my-account',
  template: `
    <h3>My Account</h3>
    <div id="profile">
      <div id="name">Name: {{user?.firstName}} {{user?.lastName}}</div>
      <div id="photo">
        <img src="{{user?.image}}">
      </div>
      <div id="contact">
        <span>Contact Information</span>
        <div id="phone">Phone Number: {{user?.phoneNumber}}</div>
        <div id="email">Email: {{user?.email}}</div>
      </div>
      <button type="button" class="btn btn-default" (click)="onEdit()">
        <span class="glyphicon glyphicon-edit"></span> Edit
      </button>
    </div>
    
    <div id="edit" *ngIf="showEditBox">
      <app-edit-account [user]="user"></app-edit-account>
    </div>

  `,
  styles: [
    `
      #profile {
        border: 2px solid black;
        width: 700px;
        height: 300px;
        position: relative;
        padding: 20px;
        font-size: 16px;
      }
      #photo {
        position: absolute;
        right: 20px;
        transform: translate(-50%, 0%)
        width: 150px;
        height: 150px;
      }
      #photo img {
        width: 160px;
        height: 150px;
      }
      #name {
        font-size: 24px;
        position: absolute;
        top: 20px;
        left: 20px;
      }
      #contact {
        position: absolute;
        left: 20px;
        top: 60px;
      }
      button {
        position: absolute;
        bottom: 20px;
        left: 20px;
      }
    `
  ]
})
export class MyAccountComponent implements OnInit, OnDestroy {

  public showEditBox: boolean = false
  public user: any
  private defaultImage: string = 'http://www.clker.com/cliparts/B/R/Y/m/P/e/blank-profile-md.png'
  private subscription: any
  private userId: number = Number(localStorage.getItem('userId'))

  constructor(private customerService: CustomerService) { }

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
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  onEdit() {
    this.showEditBox = !this.showEditBox
  }

}
