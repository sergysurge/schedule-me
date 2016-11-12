import { Component } from '@angular/core';
import { AppServiceService } from './app-service.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor () { }
  title = 'app works!';

}
