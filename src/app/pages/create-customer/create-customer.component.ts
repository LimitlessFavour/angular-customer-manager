import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'app-create-customer',
    templateUrl: './create-customer.component.html',
    styleUrls: ['./create-customer.component.css'],
    animations: [
        trigger('fadeSlideIn', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(20px)' }),
                animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ])
    ]
})
export class CreateCustomerComponent implements OnInit {
    customerForm!: FormGroup;
    isSubmitting = false;
    showValidationErrors = false;

    constructor(
        private fb: FormBuilder,
        private customerService: CustomerService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.initForm();
    }

    ngOnInit(): void { }

    private initForm(): void {
        this.customerForm = this.fb.group({
            personal: this.fb.group({
                name: ['', [Validators.required, Validators.minLength(2)]],
                username: ['', [Validators.required, Validators.minLength(3)]],
                email: ['', [Validators.required, Validators.email]],
                phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-]+$/)]],
                website: ['', [Validators.pattern(/^https?:\/\/.+$/)]],
            }),
            company: this.fb.group({
                name: ['', Validators.required],
                catchPhrase: [''],
                bs: ['']
            }),
            address: this.fb.group({
                street: ['', Validators.required],
                suite: [''],
                city: ['', Validators.required],
                zipcode: ['', Validators.required],
                geo: this.fb.group({
                    lat: [''],
                    lng: ['']
                })
            })
        });
    }

    onSubmit(): void {
        if (this.customerForm.invalid) {
            this.showValidationErrors = true;
            this.snackBar.open('Please fix the validation errors', 'Close', {
                duration: 3000,
                panelClass: ['error-snackbar']
            });
            return;
        }

        this.isSubmitting = true;
        const customerData = this.formatFormData(this.customerForm.value);

        this.customerService.createCustomer(customerData).subscribe({
            next: () => {
                this.snackBar.open('Customer created successfully!', 'Close', {
                    duration: 3000,
                    panelClass: ['success-snackbar']
                });
                this.router.navigate(['/customers']);
            },
            error: (error) => {
                this.isSubmitting = false;
                this.snackBar.open(error.message || 'Failed to create customer', 'Close', {
                    duration: 3000,
                    panelClass: ['error-snackbar']
                });
            }
        });
    }

    private formatFormData(formValue: any): any {
        const { personal, company, address } = formValue;
        return {
            ...personal,
            company,
            address
        };
    }

    getErrorMessage(control: any, fieldName: string): string {
        if (control?.hasError('required')) {
            return `${fieldName} is required`;
        }
        if (control?.hasError('email')) {
            return 'Invalid email address';
        }
        if (control?.hasError('minlength')) {
            return `${fieldName} must be at least ${control.errors?.['minlength'].requiredLength} characters`;
        }
        if (control?.hasError('pattern')) {
            return `Invalid ${fieldName.toLowerCase()} format`;
        }
        return '';
    }
} 