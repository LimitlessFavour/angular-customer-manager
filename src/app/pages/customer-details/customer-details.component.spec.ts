import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CustomerDetailsComponent } from './customer-details.component';
import { CustomerService } from '../../services/customer-service.service';
import { SharedModule } from '../../shared/shared.module';
import { API_CONFIG, DEFAULT_API_CONFIG } from '../../config/api.config';

describe('CustomerDetailsComponent', () => {
    let component: CustomerDetailsComponent;
    let fixture: ComponentFixture<CustomerDetailsComponent>;
    let customerService: jasmine.SpyObj<CustomerService>;

    const mockCustomer = {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        address: {
            street: 'Test St',
            suite: 'Suite 1',
            city: 'Testville',
            zipcode: '12345',
            geo: { lat: '0', lng: '0' }
        },
        phone: '1-234-567-8900',
        website: 'example.com',
        company: {
            name: 'Test Corp',
            catchPhrase: 'Testing is good',
            bs: 'test business'
        }
    };

    beforeEach(async () => {
        const spy = jasmine.createSpyObj('CustomerService', ['getCustomerById']);
        spy.getCustomerById.and.returnValue(of(mockCustomer));

        await TestBed.configureTestingModule({
            declarations: [CustomerDetailsComponent],
            imports: [
                RouterTestingModule,
                SharedModule
            ],
            providers: [
                { provide: CustomerService, useValue: spy },
                { provide: API_CONFIG, useValue: DEFAULT_API_CONFIG },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: {
                                get: () => '1'
                            }
                        }
                    }
                }
            ]
        }).compileComponents();

        customerService = TestBed.inject(CustomerService) as jasmine.SpyObj<CustomerService>;
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomerDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load customer details on init', () => {
        expect(customerService.getCustomerById).toHaveBeenCalledWith(1);
    });

    it('should display customer details when loaded', () => {
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('Customer Details');
        expect(compiled.querySelector('.value')?.textContent).toContain(mockCustomer.name);
    });

    it('should handle error state', () => {
        customerService.getCustomerById.and.returnValue(of(null));
        component.ngOnInit();
        fixture.detectChanges();
        expect(component.error).toBeDefined();
    });

    it('should navigate back when goBack is called', () => {
        const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
        component.goBack();
        expect(routerSpy).toHaveBeenCalledWith(['/customers']);
    });
}); 