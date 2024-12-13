import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer-service.service';
import { ICustomer } from '../../interfaces/customer';
import { catchError, Observable, of, finalize } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
  standalone: false
})
export class CustomerDetailsComponent implements OnInit {
  customer$: Observable<ICustomer | null> = of(null);
  error: string | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadCustomer(id);
    } else {
      this.router.navigate(['/customers']);
    }
  }

  private loadCustomer(id: number): void {
    this.loadingService.show();
    this.customer$ = this.customerService.getCustomerById(id).pipe(
      catchError(error => {
        this.error = error.message;
        this.loadingService.hide();
        return of(null);
      }),
      finalize(() => this.loadingService.hide())
    );
  }

  goBack(): void {
    this.router.navigate(['/customers']);
  }
} 