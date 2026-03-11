import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FashionApiService } from '../../../myservices/fashion-api-service';
import { Fashion } from '../../../myclasses/Fashion';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fashion-form',
  standalone: false,
  templateUrl: './fashion-form.html',
  styleUrl: './fashion-form.css',
})
export class FashionForm implements OnInit, OnDestroy {
  fashion = new Fashion();
  isEditMode: boolean = false;
  errMessage: string = '';
  private routeSub?: Subscription;

  constructor(
    private _service: FashionApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to route params changes
    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.loadFashion(id);
      } else {
        this.isEditMode = false;
        this.fashion = new Fashion();
      }
    });
  }

  loadFashion(id: string): void {
    this._service.getFashion(id).subscribe({
      next: (data) => { 
        this.fashion = data;
        console.log('Fashion form loaded:', data);
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

  onFileSelected(event: any): void {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fashion.thumbnail = reader.result!.toString();
    };
  }

  saveFashion(): void {
    if (this.isEditMode) {
      this._service.putFashion(this.fashion).subscribe({
        next: () => { 
          console.log('Fashion updated successfully');
          this.router.navigate(['/fashion-admin-list']);
        },
        error: (err) => { 
          this.errMessage = err.message || 'Không thể cập nhật';
          console.error('Error updating fashion:', err);
        }
      });
    } else {
      this._service.postFashion(this.fashion).subscribe({
        next: () => { 
          console.log('Fashion created successfully');
          this.router.navigate(['/fashion-admin-list']);
        },
        error: (err) => { 
          this.errMessage = err.message || 'Không thể tạo mới';
          console.error('Error creating fashion:', err);
        }
      });
    }
  }
}
