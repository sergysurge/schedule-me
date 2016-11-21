import { Component, OnDestroy } from '@angular/core';
import { AppServiceService } from './app-service.service';
import { NgForm } from "@angular/forms";
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  public isUserLoggedIn: boolean = this.authService.isUserLoggedIn
  public isUserAdmin: boolean = false
  public isUserEmployee: boolean = false
  private authSubscription: Subscription
  private userAssociations: any

  constructor (private authService: AuthService) { 
    this.authService.getIsUserLoggedIn()
      .subscribe(
        (loggedIn) => { 
          this.isUserLoggedIn = loggedIn
          if (this.isUserLoggedIn) {
            this.userAssociations = this.authService.getUserAssociations()
            console.log('get ass: ', this.userAssociations)
            this.userAssociations && (this.isUserEmployee = true)
            for(let entry in this.userAssociations) {
              if (this.userAssociations[entry][1]) {
                this.isUserAdmin = true
              }
            }
          }
        },
        (err) => { console.error(err) },
        () => { console.log('done') }
      )
  }

  onSignOut() {
    this.authService.signout()
  }

  ngOnDestroy() {
    this.authSubscription && this.authSubscription.unsubscribe()
  }

}
