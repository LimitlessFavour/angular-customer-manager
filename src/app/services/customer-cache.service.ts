import { Injectable } from '@angular/core';
import { ICustomer } from '../interfaces/customer';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerCacheService {
  private customers = new BehaviorSubject<ICustomer[]>([]);
  private lastFetch: number = 0;
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  setCustomers(customers: ICustomer[]) {
    this.customers.next(customers);
    this.lastFetch = Date.now();
  }

  getCustomers() {
    return this.customers.asObservable();
  }

  shouldRefetch(): boolean {
    return Date.now() - this.lastFetch > this.cacheTimeout;
  }

  clearCache() {
    this.customers.next([]);
    this.lastFetch = 0;
  }
} 