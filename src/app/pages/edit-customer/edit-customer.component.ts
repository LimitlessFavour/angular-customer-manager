import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../../services/loading.service';
import { ICustomer } from '../../interfaces/customer';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-edit-customer',
    templateUrl: './edit-customer.component.html',
    styleUrls: ['./edit-customer.component.css'],
    standalone: false,
    animations: [
        trigger('fadeSlideIn', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(20px)' }),
                animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ])
    ]
})
export class EditCustomerComponent implements OnInit {
    customerForm!: FormGroup;
    customerId!: number;
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private customerService: CustomerService,
        private snackBar: MatSnackBar,
        private loadingService: LoadingService
    ) {
        this.initForm();
    }

    ngOnInit(): void {
        this.customerId = Number(this.route.snapshot.paramMap.get('id'));
        this.loadCustomer();
    }

    private initForm(): void {
        this.customerForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            username: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-]+$/)]],
            gender: [''],
            website: ['', [Validators.pattern(/^https?:\/\/.+$/)]]
        });
    }

    private loadCustomer(): void {
        this.loadingService.show();
        this.customerService.getCustomerById(this.customerId).subscribe({
            next: (customer) => {
                this.customerForm.patchValue(customer);
                this.loadingService.hide();
            },
            error: (error) => {
                this.snackBar.open('Error loading customer', 'Close', {
                    duration: 3000,
                    panelClass: 'error-snackbar'
                });
                this.loadingService.hide();
            }
        });
    }

    onSubmit(): void {
        if (this.customerForm.invalid) {
            this.snackBar.open('Please fix the validation errors', 'Close', {
                duration: 3000,
                panelClass: 'error-snackbar'
            });
            return;
        }

        this.loadingService.show();
        const customerData = this.customerForm.value;

        this.customerService.updateCustomer(customerData).subscribe({
            next: () => {
                this.snackBar.open('Customer updated successfully!', 'Close', {
                    duration: 3000,
                    panelClass: 'success-snackbar'
                });
                this.router.navigate(['/customers']);
            },
            error: (error) => {
                this.snackBar.open(error.message || 'Failed to update customer', 'Close', {
                    duration: 3000,
                    panelClass: 'error-snackbar'
                });
            },
            complete: () => {
                this.loadingService.hide();
            }
        });
    }

    onCancel(): void {
        this.router.navigate(['/customers']);
    }
} 