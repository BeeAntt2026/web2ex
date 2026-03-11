import { Component, OnInit } from '@angular/core';
import { FashionApiService } from '../../../myservices/fashion-api-service';

@Component({
  selector: 'app-fashion-list',
  standalone: false,
  templateUrl: './fashion-list.html',
  styleUrl: './fashion-list.css',
})
export class FashionList implements OnInit {
  fashions: any[] = [];
  styles: string[] = [];
  selectedStyle: string = '';
  errMessage: string = '';

  constructor(private _service: FashionApiService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this._service.getFashions().subscribe({
      next: (data: any) => {
        this.fashions = data;
        // Lấy danh sách Style duy nhất để hiển thị dropdownlist
        this.styles = [...new Set(data.map((f: any) => f.style))] as string[];
      },
      error: (err: any) => { this.errMessage = err; }
    });
  }

  filterByStyle(): void {
    if (this.selectedStyle === '') {
      // Không chọn style → load lại tất cả
      this.loadAll();
    } else {
      this._service.getFashionsByStyle(this.selectedStyle).subscribe({
        next: (data: any) => { this.fashions = data; },
        error: (err: any) => { this.errMessage = err; }
      });
    }
  }
}