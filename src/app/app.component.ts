import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  public isUserLoggedIn: boolean 
  public isUserAdmin: boolean = false
  public isUserEmployee: boolean = false
  private userAssociations: any = null
  private authSubscription: Subscription
  private userAssociationsSubscription: Subscription

  constructor (private authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.authSubscription = this.authService.getIsUserLoggedIn()
      .subscribe(
        (loggedIn) => { 
          this.isUserLoggedIn = loggedIn
        },
        (err) => { console.error(err) },
        () => { console.log('done') }
      )
    this.userAssociationsSubscription = this.authService.getUserAssociations()
      .subscribe(
        (userAssociations) => {
          this.userAssociations = userAssociations
          if (!this.userAssociations) {
            this.isUserAdmin = false
            this.isUserEmployee = false
          } else {
            this.isUserEmployee = true
            this.isUserAdmin = false
            for (let entry in this.userAssociations) {
              if (this.userAssociations[entry][1]) {
                this.isUserAdmin = true
              }
            }
          }
        }
      )
  }

  onSignOut() {
    this.authService.signout()
  }

  ngOnDestroy() {
    this.authSubscription && this.authSubscription.unsubscribe()
    this.userAssociationsSubscription && this.userAssociationsSubscription.unsubscribe()
  }

}
