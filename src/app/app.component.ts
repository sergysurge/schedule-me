import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppServiceService } from './app-service.service';
import { NgForm } from "@angular/forms";
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  public isUserLoggedIn: boolean //= this.authService.isUserLoggedIn
  public isUserAdmin: boolean = false
  public isUserEmployee: boolean = false
  private authSubscription: Subscription
  private userAssociations: any

  constructor (private authService: AuthService) { 
    this.authSubscription = this.authService.getIsUserLoggedIn()
      .subscribe(
        (loggedIn) => { 
          console.log('sub: ', loggedIn)
          this.isUserLoggedIn = loggedIn
          if (this.isUserLoggedIn) {
            this.userAssociations = this.authService.getUserAssociations()
            if (!this.userAssociations.length) {
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
        },
        (err) => { console.error(err) },
        () => { console.log('done') }
      )
  }

  ngOnInit() {
    console.log('initing')

  }

  onSignOut() {
    this.authService.signout()
  }

  ngOnDestroy() {
    this.authSubscription && this.authSubscription.unsubscribe()
  }

}
