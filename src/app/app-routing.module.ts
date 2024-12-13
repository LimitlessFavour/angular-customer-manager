import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './pages/customer/customer.component';
import { CreateCustomerComponent } from './pages/create-customer/create-customer.component';
import { CustomerDetailsComponent } from './pages/customer-details/customer-details.component';

const routes: Routes = [
    { path: '', redirectTo: 'customers', pathMatch: 'full' },
    { path: 'customers', component: CustomerComponent },
    { path: 'create-customer', component: CreateCustomerComponent },
    { path: 'customers/:id', component: CustomerDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { } 