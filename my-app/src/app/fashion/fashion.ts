import { Component, OnInit } from '@angular/core';
import { FashionApiservice } from '../myservices/fashion-apiservice';

@Component({
  selector: 'app-fashion',
  standalone: false,
  templateUrl: './fashion.html',
  styleUrl: './fashion.css',
})
export class Fashion implements OnInit {
  fashions: any;
  errMessage: string = '';

  constructor(public _service: FashionApiservice) {}

  ngOnInit(): void {
    this._service.getFashions().subscribe({
      next: (data) => { this.fashions = data; },
      error: (err) => { this.errMessage = err; }
    });
  }
}
