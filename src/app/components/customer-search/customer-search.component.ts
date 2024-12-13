import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchCriteria } from '../../interfaces/search-criteria';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css'],
  standalone: false,
})
export class CustomerSearchComponent {
  @Output() search = new EventEmitter<SearchCriteria>();

  searchForm: FormGroup;
  searchFields = [
    { value: 'name', label: 'Name' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' }
  ];

  constructor(
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchTerm: [''],
      searchBy: ['name']
    });

    this.searchForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.search.emit(value);
      });
  }

  clearSearch(): void {
    this.searchForm.patchValue({ searchTerm: '', searchBy: 'name' });
    this.search.emit({ searchTerm: '', searchBy: 'name' });
  }
} 