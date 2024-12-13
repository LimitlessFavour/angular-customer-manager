import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: CustomerComponent }
    ])
  ]
})
export class CustomerModule { } 