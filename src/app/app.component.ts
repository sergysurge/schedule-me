import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './app-service.service';
import { NgForm } from "@angular/forms";
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isUserLoggedIn: boolean = true
  constructor (private authService: AuthService) { }
  
  ngOnInit() {
    this.authService.getIsUserLoggedIn()
      .subscribe(
        (loggedIn) => { this.isUserLoggedIn = loggedIn; console.log('getting') },
        (err) => { console.error(err) },
        () => { console.log('done') }
      )
  }
  
  onSignOut() {
    this.authService.signout()
  }
}
