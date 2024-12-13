import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditCustomerComponent } from './edit-customer.component';
import { CustomerService } from '../../services/customer-service.service';
import { LoadingService } from '../../services/loading.service';
import { of } from 'rxjs';

describe('EditCustomerComponent', () => {
    let component: EditCustomerComponent;
    let fixture: ComponentFixture<EditCustomerComponent>;
    let customerServiceSpy: jasmine.SpyObj<CustomerService>;
    let loadingServiceSpy: jasmine.SpyObj<LoadingService>;

    beforeEach(async () => {
        const custSpy = jasmine.createSpyObj('CustomerService', ['getCustomerById', 'updateCustomer']);
        const loadSpy = jasmine.createSpyObj('LoadingService', ['show', 'hide']);

        await TestBed.configureTestingModule({
            declarations: [EditCustomerComponent],
            imports: [
                ReactiveFormsModule,
                RouterTestingModule,
                MatSnackBarModule,
                BrowserAnimationsModule
            ],
            providers: [
                { provide: CustomerService, useValue: custSpy },
                { provide: LoadingService, useValue: loadSpy }
            ]
        }).compileComponents();

        customerServiceSpy = TestBed.inject(CustomerService) as jasmine.SpyObj<CustomerService>;
        loadingServiceSpy = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
    });

    beforeEach(() => {
        customerServiceSpy.getCustomerById.and.returnValue(of({
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
            username: 'testuser',
            address: {
                street: '123 Test St',
                suite: 'Apt 1',
                city: 'Test City',
                zipcode: '12345',
                geo: { lat: '0', lng: '0' }
            },
            phone: '123-456-7890',
            website: 'test.com',
            company: {
                name: 'Test Company',
                catchPhrase: 'Testing',
                bs: 'Test BS'
            }
        }));

        fixture = TestBed.createComponent(EditCustomerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // Add more tests as needed
}); 