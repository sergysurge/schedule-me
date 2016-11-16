import { Component } from '@angular/core';
import { AppServiceService } from './app-service.service';
import { NgForm } from "@angular/forms";
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public isUserLoggedIn: boolean = this.authService.isUserLoggedIn
  constructor (private authService: AuthService) { 
    this.authService.getIsUserLoggedIn()
      .subscribe(
        (loggedIn) => { this.isUserLoggedIn = loggedIn; console.log('getting', loggedIn) },
        (err) => { console.error(err) },
        () => { console.log('done') }
      )
  }

  onSignOut() {
    this.authService.signout()
  }

}
