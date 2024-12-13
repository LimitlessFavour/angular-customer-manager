import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'customers', pathMatch: 'full' },
    {
        path: 'customers',
        loadChildren: () => import('./pages/customer/customer.module').then(m => m.CustomerModule)
    },
    {
        path: 'create-customer',
        loadChildren: () => import('./pages/create-customer/create-customer.module').then(m => m.CreateCustomerModule)
    },
    {
        path: 'customers/:id',
        loadChildren: () => import('./pages/customer-details/customer-details.module').then(m => m.CustomerDetailsModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { } 