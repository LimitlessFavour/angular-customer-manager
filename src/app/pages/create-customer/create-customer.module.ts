import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCustomerComponent } from './create-customer.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CreateCustomerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: CreateCustomerComponent }
    ])
  ]
})
export class CreateCustomerModule { } 