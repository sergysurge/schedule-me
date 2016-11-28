import { Component, Input } from '@angular/core';
import { TabComponent } from './tab.component'

@Component({
  selector: 'app-tabs',
  template: `
    <ul class="login-nav">
      <li class="login-nav__item active" *ngFor="let tab of tabs" (click)="onSelectTab(tab)" [class.active]="tab.active">
        <a>{{ tab.title }}</a>
      </li>
    </ul>
    <ng-content></ng-content>
  `,
  styles: [
    `
      .login-nav {
        position: relative;
        padding: 0;
        margin: 0 0 1rem;
      }
      .login-nav__item {
        list-style: none;
        display: inline-block;
      }
      .login-nav__item + .login-nav__item {
        margin-left: 2.25rem;
      }
      .login-nav__item a {
        position: relative;
        color: rgba(255, 255, 255, 0.5);
        text-decoration: none;
        text-transform: uppercase;
        font-weight: 500;
        font-size: 2.5rem;
        padding-bottom: .5rem;
        transition: .20s all ease;
      }
      .login-nav__item.active a, .login-nav__item a:hover {
        color: #ffffff;
        transition: .15s all ease;
      }
      .login-nav__item a:after {
        content: '';
        display: inline-block;
        height: 10px;
        background-color: rgb(255, 255, 255);
        position: absolute;
        right: 100%;
        bottom: -1px;
        left: 0;
        border-radius: 50%;
        transition: .15s all ease;
      }
      .login-nav__item a:hover:after, .login-nav__item.active a:after {
        background-color: rgb(17, 97, 237);
        height: 2px;
        right: 0;
        bottom: 2px;
        border-radius: 0;
        transition: .20s all ease;
      }
    `
  ]
})

export class TabsComponent {

  tabs: TabComponent[] = []
  
  addTab(tab: TabComponent) {
    this.tabs.push(tab)

    if (this.tabs.length === 1) {
      this.onSelectTab(tab)
    }
  }

  onSelectTab(selectedTab: TabComponent) {
    this.tabs.forEach((tab) => {
      if (tab == selectedTab) {
        tab.active = true
      } else {
        tab.active = false
      }
    })
  }
}
