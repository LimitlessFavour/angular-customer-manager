import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable().pipe(
    debounceTime(200)
  );

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    setTimeout(() => {
      this.loadingSubject.next(false);
    }, 300);
  }
} 