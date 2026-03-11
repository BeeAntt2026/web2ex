import { Component } from '@angular/core';
import { FashionApiservice } from '../myservices/fashion-apiservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Fashion } from '../myclasses/Fashion';

@Component({
  selector: 'app-fashion-form',
  standalone: false,
  templateUrl: './fashion-form.html',
  styleUrl: './fashion-form.css',
})
export class FashionForm {
  fashion = new Fashion();
  isEditMode: boolean = false;
  errMessage: string = '';

  constructor(
    private _service: FashionApiservice,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Nếu URL có :id → đang ở chế độ Sửa
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this._service.getFashion(id).subscribe({
        next: (data) => { this.fashion = data; },
        error: (err) => { this.errMessage = err; }
      });
    }
  }

  // Xử lý chọn ảnh → chuyển sang Base64 (tương tự trang 111)
  onFileSelected(event: any): void {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fashion.thumbnail = reader.result!.toString();
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  saveFashion(): void {
    if (this.isEditMode) {
      // Chế độ SỬA → gọi PUT
      this._service.putFashion(this.fashion).subscribe({
        next: () => { this.router.navigate(['/fashion-admin-list']); },
        error: (err) => { this.errMessage = err; }
      });
    } else {
      // Chế độ THÊM MỚI → gọi POST
      this._service.postFashion(this.fashion).subscribe({
        next: () => { this.router.navigate(['/fashion-admin-list']); },
        error: (err) => { this.errMessage = err; }
      });
    }
  }
}
