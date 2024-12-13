import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerDetailsComponent } from './customer-details.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CustomerDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: CustomerDetailsComponent }
    ])
  ]
})
export class CustomerDetailsModule { } 