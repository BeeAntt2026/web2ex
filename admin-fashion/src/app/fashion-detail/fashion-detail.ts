import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FashionApiService } from '../../../myservices/fashion-api-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fashion-detail',
  standalone: false,
  templateUrl: './fashion-detail.html',
  styleUrl: './fashion-detail.css',
})
export class FashionDetail implements OnInit, OnDestroy {
  fashion: any = null;
  errMessage: string = '';
  private routeSub?: Subscription;

  constructor(
    private _service: FashionApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to route params changes to reload data when params change
    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadFashion(id);
      }
    });
  }

  loadFashion(id: string): void {
    this.fashion = null; // Reset data
    this.errMessage = '';
    
    this._service.getFashion(id).subscribe({
      next: (data) => { 
        this.fashion = data;
        console.log('Fashion data loaded:', data);
      },
      error: (err) => { 
        this.errMessage = err.message || 'Không thể tải dữ liệu';
        console.error('Error loading fashion:', err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
