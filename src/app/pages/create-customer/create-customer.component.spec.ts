import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateCustomerComponent } from './create-customer.component';
import { CustomerService } from '../../services/customer-service.service';
import { SharedModule } from '../../shared/shared.module';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('CreateCustomerComponent', () => {
    let component: CreateCustomerComponent;
    let fixture: ComponentFixture<CreateCustomerComponent>;
    let customerService: jasmine.SpyObj<CustomerService>;
    let snackBar: jasmine.SpyObj<MatSnackBar>;
    let router: Router;

    const mockCustomer = {
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        phone: '1234567890',
        website: 'http://example.com',
        company: {
            name: 'Test Company',
            catchPhrase: 'Test Phrase',
            bs: 'Test BS'
        },
        address: {
            street: 'Test Street',
            suite: 'Test Suite',
            city: 'Test City',
            zipcode: '12345',
            geo: { lat: '0', lng: '0' }
        }
    };

    beforeEach(async () => {
        const serviceSpy = jasmine.createSpyObj('CustomerService', ['createCustomer']);
        const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

        await TestBed.configureTestingModule({
            declarations: [CreateCustomerComponent],
            imports: [
                ReactiveFormsModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                SharedModule
            ],
            providers: [
                FormBuilder,
                { provide: CustomerService, useValue: serviceSpy },
                { provide: MatSnackBar, useValue: snackBarSpy }
            ]
        }).compileComponents();

        customerService = TestBed.inject(CustomerService) as jasmine.SpyObj<CustomerService>;
        snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
        router = TestBed.inject(Router);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateCustomerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the form with empty values', () => {
        expect(component.customerForm.get('personal.name')?.value).toBe('');
        expect(component.customerForm.get('company.name')?.value).toBe('');
        expect(component.customerForm.get('address.street')?.value).toBe('');
    });

    it('should show validation errors when submitting invalid form', () => {
        component.onSubmit();
        expect(component.showValidationErrors).toBeTrue();
        expect(snackBar.open).toHaveBeenCalledWith(
            'Please fix the validation errors',
            'Close',
            jasmine.any(Object)
        );
    });

    it('should successfully submit valid form', () => {
        customerService.createCustomer.and.returnValue(of(mockCustomer as any));
        const routerSpy = spyOn(router, 'navigate');

        component.customerForm.patchValue({
            personal: {
                name: mockCustomer.name,
                username: mockCustomer.username,
                email: mockCustomer.email,
                phone: mockCustomer.phone,
                website: mockCustomer.website
            },
            company: mockCustomer.company,
            address: mockCustomer.address
        });

        component.onSubmit();

        expect(customerService.createCustomer).toHaveBeenCalled();
        expect(routerSpy).toHaveBeenCalledWith(['/customers']);
        expect(snackBar.open).toHaveBeenCalledWith(
            'Customer created successfully!',
            'Close',
            jasmine.any(Object)
        );
    });

    it('should handle error during submission', () => {
        const errorMessage = 'Creation failed';
        customerService.createCustomer.and.returnValue(throwError(() => new Error(errorMessage)));

        component.customerForm.patchValue({
            personal: {
                name: mockCustomer.name,
                username: mockCustomer.username,
                email: mockCustomer.email,
                phone: mockCustomer.phone,
                website: mockCustomer.website
            },
            company: mockCustomer.company,
            address: mockCustomer.address
        });

        component.onSubmit();

        expect(component.isSubmitting).toBeFalse();
        expect(snackBar.open).toHaveBeenCalledWith(
            errorMessage,
            'Close',
            jasmine.any(Object)
        );
    });

    it('should return correct error messages', () => {
        const nameControl = component.customerForm.get('personal.name');
        nameControl?.setErrors({ required: true });
        expect(component.getErrorMessage(nameControl, 'Name')).toBe('Name is required');

        const emailControl = component.customerForm.get('personal.email');
        emailControl?.setErrors({ email: true });
        expect(component.getErrorMessage(emailControl, 'Email')).toBe('Invalid email address');
    });
}); 