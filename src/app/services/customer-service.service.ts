import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, timeout } from 'rxjs/operators';
import { ICustomer } from '../interfaces/customer';
import { SearchCriteria } from '../interfaces/criteria';
import { API_CONFIG, ApiConfig } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly apiUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG) private config: ApiConfig
  ) {
    this.apiUrl = `${this.config.baseUrl}${this.config.endpoints.customers}`;
  }

  /**
   * Retrieves all customers from the API
   * @returns Observable<ICustomer[]>
   */
  getCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.apiUrl).pipe(
      timeout(this.config.timeoutMs),
      retry(this.config.retryAttempts),
      catchError(this.handleError)
    );
  }

  /**
   * Creates a new customer
   * @param customer The customer data to create
   * @returns Observable<ICustomer>
   */
  createCustomer(customer: Omit<ICustomer, 'id'>): Observable<ICustomer> {
    return this.http.post<ICustomer>(this.apiUrl, customer).pipe(
      timeout(this.config.timeoutMs),
      catchError(this.handleError)
    );
  }

  /**
   * Updates an existing customer
   * @param customer The customer data to update
   * @returns Observable<ICustomer>
   */
  updateCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http.put<ICustomer>(`${this.apiUrl}/${customer.id}`, customer).pipe(
      timeout(this.config.timeoutMs),
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a customer by ID
   * @param id The ID of the customer to delete
   * @returns Observable<void>
   */
  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      timeout(this.config.timeoutMs),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a specific customer by ID
   * @param id The ID of the customer to retrieve
   * @returns Observable<ICustomer>
   */
  getCustomerById(id: number): Observable<ICustomer> {
    return this.http.get<ICustomer>(`${this.apiUrl}/${id}`).pipe(
      timeout(this.config.timeoutMs),
      retry(this.config.retryAttempts),
      catchError(this.handleError)
    );
  }

  /**
   * Searches customers based on provided criteria
   * @param criteria The search criteria
   * @returns Observable<ICustomer[]>
   */
  searchCustomers(criteria: SearchCriteria): Observable<ICustomer[]> {
    if (!criteria.searchTerm || !criteria.searchBy) {
      return throwError(() => new Error('Invalid search criteria'));
    }

    return this.getCustomers().pipe(
      map(customers => this.filterCustomers(customers, criteria)),
      catchError(this.handleError)
    );
  }

  /**
   * Filters customers based on search criteria
   * @private
   */
  private filterCustomers(customers: ICustomer[], criteria: SearchCriteria): ICustomer[] {
    const searchTerm = criteria.searchTerm.toLowerCase();
    return customers.filter(customer => {
      const value = this.getNestedValue(customer, criteria.searchBy);
      return typeof value === 'string' && value.toLowerCase().includes(searchTerm);
    });
  }

  /**
   * Gets nested object values safely
   * @private
   */
  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  /**
   * Handles HTTP errors
   * @private
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
