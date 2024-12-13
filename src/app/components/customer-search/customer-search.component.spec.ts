import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerSearchComponent } from './customer-search.component';
import { SharedModule } from '../../shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CustomerSearchComponent', () => {
  let component: CustomerSearchComponent;
  let fixture: ComponentFixture<CustomerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerSearchComponent],
      imports: [
        ReactiveFormsModule,
        SharedModule,
        NoopAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search criteria after debounce time', fakeAsync(() => {
    const searchSpy = spyOn(component.search, 'emit');
    const searchTerm = 'test';
    
    component.searchForm.patchValue({
      searchTerm,
      searchBy: 'name'
    });

    tick(300);

    expect(searchSpy).toHaveBeenCalledWith({
      searchTerm,
      searchBy: 'name'
    });
  }));

  it('should not emit if search term is empty', fakeAsync(() => {
    const searchSpy = spyOn(component.search, 'emit');
    
    component.searchForm.patchValue({
      searchTerm: '',
      searchBy: 'name'
    });

    tick(300);

    expect(searchSpy).not.toHaveBeenCalled();
  }));
}); 