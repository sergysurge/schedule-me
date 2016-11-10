import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { CompanyService } from './company.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    CompanyComponent
  ],
  exports: [
    CompanyComponent
  ],
  providers: [CompanyService]
})
export class CompanyModule { }
