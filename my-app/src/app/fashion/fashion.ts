import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FashionApiservice } from '../myservices/fashion-apiservice';

@Component({
  selector: 'app-fashion',
  standalone: false,
  templateUrl: './fashion.html',
  styleUrl: './fashion.css',
})
export class Fashion implements OnInit {
  fashions: any[] = [];
  styles: string[] = [];
  selectedStyle: string = '';
  errMessage: string = '';

  constructor(public _service: FashionApiservice) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this._service.getFashions().subscribe({
      next: (data) => {
        this.fashions = data;
        // Lấy danh sách Style duy nhất cho dropdownlist
        this.styles = [...new Set(data.map((f: any) => f.style))] as string[];
      },
      error: (err) => { this.errMessage = err; }
    });
  }

  filterByStyle(): void {
    if (this.selectedStyle === '') {
      this.loadAll();
    } else {
      this._service.getFashionsByStyle(this.selectedStyle).subscribe({
        next: (data) => { this.fashions = data; },
        error: (err) => { this.errMessage = err; }
      });
    }
  }
}
