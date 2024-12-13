import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'customers',
        loadChildren: () => import('./pages/customer/customer.module')
            .then(m => m.CustomerModule)
    },
    {
        path: 'customers/:id',
        loadChildren: () => import('./pages/customer-details/customer-details.module')
            .then(m => m.CustomerDetailsModule)
    },
    { path: '', redirectTo: 'customers', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { } 