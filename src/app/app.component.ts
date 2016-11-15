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
  isLoggedIn: boolean

  constructor (private authService: AuthService) { 
    // this.isLoggedIn = this.authService.isLoggedIn()
  }
  
  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn()
  }
  
  onSignOut() {
    this.isLoggedIn = false
    this.authService.signout()
  }
}
