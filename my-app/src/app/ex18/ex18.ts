import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-ex18',
  standalone: false,
  templateUrl: './ex18.html',
  styleUrl: './ex18.css',
})
export class Ex18 {
  customerGroups$: Observable<any>;
  constructor(private http: HttpClient) {
    this.customerGroups$ = this.http.get('/assets/data/customers.json');
  }
}
