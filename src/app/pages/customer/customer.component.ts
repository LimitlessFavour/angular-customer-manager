import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer-service.service';
import { ICustomer } from '../../interfaces/customer';
import { SearchCriteria } from '../../interfaces/search-criteria';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../../components/delete-confirmation/delete-confirmation.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from '../../services/loading.service';
import { CustomerCacheService } from '../../services/customer-cache.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  standalone: false,
})
export class CustomerComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'company', 'actions'];
  dataSource: MatTableDataSource<ICustomer>;
  isLoading = true;
  error: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private customerService: CustomerService,
    private customerCacheService: CustomerCacheService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService
  ) {
    this.dataSource = new MatTableDataSource<ICustomer>();
  }

  ngOnInit(): void {
    // Subscribe to cached data first
    this.customerCacheService.getCustomers().subscribe(customers => {
      if (customers.length > 0) {
        this.isLoading = false;
        this.dataSource.data = customers;
        this.setupDataSource();
      } else {
        this.loadCustomers();
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.paginator.pageSize = 10;
    }
  }

  loadCustomers(): void {
    if (this.customerCacheService.shouldRefetch()) {
      this.isLoading = true;
      this.customerService.getCustomers().subscribe({
        next: (customers) => {
          this.customerCacheService.setCustomers(customers);
          this.dataSource.data = customers;
          this.setupDataSource();
          this.isLoading = false;
        },
        error: (error) => {
          this.error = error.message;
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
    }
  }

  private setupDataSource(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewCustomerDetails(id: number): void {
    this.router.navigate(['/customers', id]);
  }

  onSearch(criteria: SearchCriteria): void {
    this.dataSource.filterPredicate = (data: ICustomer, filter: string) => {
      const searchStr = JSON.parse(filter).searchTerm.toLowerCase();
      return data.name.toLowerCase().includes(searchStr) ||
        data.email.toLowerCase().includes(searchStr) ||
        data.phone.toLowerCase().includes(searchStr);
    };
    this.dataSource.filter = JSON.stringify(criteria);
  }

  navigateToCreateCustomer(): void {
    this.router.navigate(['/create-customer']);
  }

  async onDelete(customer: ICustomer): Promise<void> {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: { customerName: customer.name },
      panelClass: 'delete-dialog-container',
      disableClose: true
    });

    const result = await dialogRef.afterClosed().toPromise();

    if (result) {
      this.loadingService.show();
      try {
        await this.customerService.deleteCustomer(customer.id);
        this.snackBar.open('Customer deleted successfully', 'Close', {
          duration: 3000,
          panelClass: 'success-snackbar'
        });
        this.loadCustomers();
      } catch (error) {
        this.snackBar.open('Error deleting customer', 'Close', {
          duration: 3000,
          panelClass: 'error-snackbar'
        });
      } finally {
        this.loadingService.hide();
      }
    }
  }

  onEdit(customer: ICustomer): void {
    this.router.navigate(['/customers', customer.id, 'edit']);
  }
}
