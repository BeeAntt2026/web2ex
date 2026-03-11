import { Component } from '@angular/core';
import { FashionApiservice } from '../myservices/fashion-apiservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fashion-admin-list',
  standalone: false,
  templateUrl: './fashion-admin-list.html',
  styleUrl: './fashion-admin-list.css',
})
export class FashionAdminList {
  fashions: any[] = [];
  errMessage: string = '';

  constructor(private _service: FashionApiservice, private router: Router) {}

  ngOnInit(): void {
    this.loadFashions();
  }

  loadFashions(): void {
    this._service.getFashions().subscribe({
      next: (data) => { this.fashions = data; },
      error: (err) => { this.errMessage = err; }
    });
  }

  deleteFashion(id: string): void {
    if (confirm("Bạn có chắc muốn xóa Fashion này không?")) {
      this._service.deleteFashion(id).subscribe({
        next: () => { this.loadFashions(); },
        error: (err) => { this.errMessage = err; }
      });
    }
  }
}
