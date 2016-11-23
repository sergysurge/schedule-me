import { Component, Input, animate, transition, trigger, state, style } from '@angular/core';
import { TabsComponent } from './tabs.component'

@Component({
  selector: 'app-tab',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate(250, style({ opacity: 0 }))
      ])
    ])
  ],
  template: `
    <div *ngIf="active" [@fadeInOut]="!active">
      <ng-content></ng-content>
    </div>
  `
})
export class TabComponent {

  public active: Boolean
  // @Input() tabClass: string
  @Input() title: string
  
  constructor(tabs: TabsComponent) { 
    tabs.addTab(this)
  }
}
