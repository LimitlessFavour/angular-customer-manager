import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';

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
    },
    {
        path: 'customers/:id/edit',
        loadChildren: () => import('./pages/edit-customer/edit-customer.module')
            .then(m => m.EditCustomerModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        LoadingIndicatorComponent
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { } 