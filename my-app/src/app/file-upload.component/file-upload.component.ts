import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/internal/operators/finalize';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-file-upload.component',
  standalone: false,
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
})
export class FileUploadComponent {
  @Input()
  requiredFileType: any;
  
  fileName = '';
  uploadProgress: number = 0;
  uploadSub: Subscription = new Subscription();
  uploadedImagePath = '';
  message = '';
  
  // Book form fields - theo cấu trúc mới
  bookId = '';
  tensach = '';
  giaban: number = 0;
  mota = '';
  soluongton: number = 0;
  maCD: number = 0;
  maNXB: number = 0;
  
  constructor(private http: HttpClient, private router: Router) {}
  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("image", file);
      
      // Upload to my-server-uploadfile (port 3001)
      const upload$ = this.http.post("http://localhost:3001/upload", formData, {
        reportProgress: true,
        observe: 'events',
        responseType: 'text'
      }).pipe(
        finalize(() => this.reset())
      );
      
      this.uploadSub = upload$.subscribe({
        next: (event: any) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total!));
          }
          if (event.type == HttpEventType.Response) {
            this.uploadedImagePath = this.fileName;
            this.message = 'Upload ảnh thành công!';
          }
        },
        error: (err) => {
          this.message = 'Upload failed: ' + err.message;
        }
      });
    }
  }
  
  addBook() {
    if (!this.bookId || !this.tensach) {
      this.message = 'Vui lòng nhập đầy đủ thông tin!';
      return;
    }
    
    const newBook = {
      BookId: this.bookId,
      Tensach: this.tensach,
      Giaban: this.giaban,
      Mota: this.mota,
      Anhbia: this.uploadedImagePath || 'default.png',
      Ngaycapnhat: new Date().toLocaleDateString('vi-VN'),
      Soluongton: this.soluongton,
      MaCD: this.maCD,
      MaNXB: this.maNXB
    };
    
    this.http.post<any[]>('http://localhost:3000/books', newBook).subscribe({
      next: () => {
        alert('Thêm sách thành công!');
        this.router.navigate(['/books']);
      },
      error: (err) => {
        this.message = 'Lỗi thêm sách: ' + err.message;
      }
    });
  }
  
  cancel() {
    this.router.navigate(['/books']);
  }
  
  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }
  
  reset() {
    this.uploadProgress = 0;
    this.uploadSub = new Subscription();
  }

  getImageUrl(imageName: string): string {
    if (!imageName) return '';
    const oldImages = ['b1.png', 'b2.png', 'b3.png', 'b4.png', 'b5.png', 'THCB.jpg', 'TH004.jpg', 'LTWeb2005.jpg'];
    if (oldImages.includes(imageName)) {
      return 'http://localhost:3000/images/' + imageName;
    }
    return 'http://localhost:3001/image/' + imageName;
  }
}

