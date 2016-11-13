import { Component, Input } from '@angular/core';
import { TabsComponent } from './tabs.component'
@Component({
  selector: 'app-tab',
  template: `
    <div *ngIf="active" class="pane">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class TabComponent {

  constructor(tabs: TabsComponent) { 
    tabs.addTab(this)
  }
  public active: Boolean
  @Input() title: string
}
