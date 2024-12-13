import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { CustomerSearchComponent } from '../../components/customer-search/customer-search.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerSearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: CustomerComponent }
    ])
  ]
})
export class CustomerModule { } 