import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FashionApiService } from '../../../myservices/fashion-api-service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-fashion-admin-list',
  standalone: false,
  templateUrl: './fashion-admin-list.html',
  styleUrl: './fashion-admin-list.css',
})
export class FashionAdminList implements OnInit {
  fashions: any[] = [];
  errMessage: string = '';

  constructor(private _service: FashionApiService, private router: Router) {
    // Reload data when navigating back to this route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (event.url.includes('fashion-admin-list')) {
        this.loadFashions();
      }
    });
  }

  ngOnInit(): void {
    this.loadFashions();
  }

  loadFashions(): void {
    this._service.getFashions().subscribe({
      next: (data) => { 
        this.fashions = data;
        console.log('Loaded fashions:', data);
      },
      error: (err) => { 
        this.errMessage = err.message || 'Không thể tải danh sách';
        console.error('Error loading fashions:', err);
      }
    });
  }

  deleteFashion(id: string): void {
    if (confirm('Bạn có chắc muốn xóa Fashion này không?')) {
      this._service.deleteFashion(id).subscribe({
        next: () => { 
          console.log('Fashion deleted, reloading list...');
          this.loadFashions(); 
        },
        error: (err) => { 
          this.errMessage = err.message || 'Không thể xóa';
          console.error('Error deleting fashion:', err);
        }
      });
    }
  }
}