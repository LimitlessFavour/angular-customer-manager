import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerService } from './customer-service.service';
import { API_CONFIG, DEFAULT_API_CONFIG } from '../config/api.config';
import { ICustomer } from '../interfaces/customer';
import { SearchCriteria } from '../interfaces/criteria';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;
  const apiUrl = `${DEFAULT_API_CONFIG.baseUrl}${DEFAULT_API_CONFIG.endpoints.customers}`;

  const mockCustomer: ICustomer = {
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CustomerService,
        { provide: API_CONFIG, useValue: DEFAULT_API_CONFIG }
      ]
    });

    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCustomers', () => {
    it('should return all customers', () => {
      const mockCustomers = [mockCustomer];

      service.getCustomers().subscribe(customers => {
        expect(customers).toEqual(mockCustomers);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockCustomers);
    });
  });

  describe('createCustomer', () => {
    it('should create a customer', () => {
      const { id, ...customerData } = mockCustomer;

      service.createCustomer(customerData).subscribe(customer => {
        expect(customer).toEqual(mockCustomer);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(customerData);
      req.flush(mockCustomer);
    });
  });

  describe('updateCustomer', () => {
    it('should update a customer', () => {
      service.updateCustomer(mockCustomer).subscribe(customer => {
        expect(customer).toEqual(mockCustomer);
      });

      const req = httpMock.expectOne(`${apiUrl}/${mockCustomer.id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockCustomer);
      req.flush(mockCustomer);
    });
  });

  describe('deleteCustomer', () => {
    it('should delete a customer', () => {
      service.deleteCustomer(1).subscribe(response => {
        expect(response).toBeUndefined();
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('searchCustomers', () => {
    it('should filter customers by search criteria', () => {
      const mockCustomers = [mockCustomer];
      const searchCriteria = { searchTerm: 'John', searchBy: 'name' };

      service.searchCustomers(searchCriteria as SearchCriteria).subscribe(customers => {
        expect(customers).toEqual(mockCustomers);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockCustomers);
    });

    it('should return empty array for non-matching criteria', () => {
      const mockCustomers = [mockCustomer];
      const searchCriteria = { searchTerm: 'xyz', searchBy: 'name' };

      service.searchCustomers(searchCriteria as SearchCriteria).subscribe(customers => {
        expect(customers).toEqual([]);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockCustomers);
    });
  });
});
