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
      personal: this.fb.group({
        name: [''],
        username: [''],
        email: [''],
        phone: [''],
        website: ['']
      }),
      company: this.fb.group({
        name: [''],
        catchPhrase: [''],
        bs: ['']
      }),
      address: this.fb.group({
        street: [''],
        suite: [''],
        city: [''],
        zipcode: [''],
        geo: this.fb.group({
          lat: [''],
          lng: ['']
        })
      })
    });
  }

  private loadCustomer(): void {
    this.loadingService.show();
    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (customer) => {
        const formattedData = {
          personal: {
            name: customer.name,
            username: customer.username,
            email: customer.email,
            phone: customer.phone,
            website: customer.website
          },
          company: customer.company,
          address: customer.address
        };
        this.customerForm.patchValue(formattedData);
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
    this.loadingService.show();
    const formData = this.customerForm.value;
    const customerData = {
      id: this.customerId,
      ...formData.personal,
      company: formData.company,
      address: formData.address
    };

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