import { Component, OnInit, Input, animate, transition, trigger, state, style } from '@angular/core';

@Component({
  selector: 'app-dev-profile',
  template: `
    <div class="profile-container" on-mouseenter="toggleDetails()" on-mouseleave="toggleDetails()">
        <div id="photo-bio">
          <img src="{{imgSource}}" class="img-circle img-responsive profile-img" [ngClass]="{'show-details': showDetails}">
        </div>
        <div class="details">
          <div class="name">{{name}}</div>
          <a href="{{linkedIn}}">
            <i class="fa fa-linkedin-square"></i>
          </a>
          <a href="{{github}}">
            <i class="fa fa-github"></i>
          </a>
          <div class="bio" *ngIf="showDetails">
            <ng-content></ng-content>
          </div>       
        </div>
    </div>
  `,
  styles: [
    `
      .profile-container {
        width: 100%;
        height: 100%;
      }
      .photo-bio {
        width: 100%;
      }
      .profile-img {
        border: 8px solid white;
        width: 250px;
        height: auto;
        margin: auto;
      }
      .show-details {
        transform: scale(1.1);
        transition: all .1s ease-in-out;
      }
      .bio, .bio>* {
        width: 250px;
        height: 100px;
        margin: auto;
        font-size: 18px;
        color: white;
      }
      a {
        color: black;
      }
      .fa-github:hover, .fa-linkedin-square:hover {
        transform: scale(1.2);
        transition: all .1s ease-in-out;
      }
      .name {
        font-size: 22px;
        color: white;
        text-decoration: bold;
        margin: 5% auto 0 auto;
      }
      .fa-github, .fa-linkedin-square {
        font-size: 40px;
        margin: 10px;
      }
    `
  ]
})
export class DevProfileComponent {
  @Input() imgSource: string
  @Input() name: string
  @Input() github: string
  @Input() linkedIn: string
  public showDetails: boolean = false
  constructor() { }

  toggleDetails() {
    this.showDetails = !this.showDetails
  } 
  
}
