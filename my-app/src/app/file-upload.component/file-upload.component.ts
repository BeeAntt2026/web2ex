import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
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
  
  // Book form fields
  bookId = '';
  bookName = '';
  bookPrice: number = 0;
  
  // Books list
  books: any[] = [];
  
  constructor(private http: HttpClient) {
    this.loadBooks();
  }
  
  loadBooks() {
    this.http.get<any[]>('http://localhost:3000/books').subscribe({
      next: (data) => { this.books = data; },
      error: (err) => { console.error('Error loading books:', err); }
    });
  }
  
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
            // Server trả về 200 OK, lưu tên file
            this.uploadedImagePath = this.fileName;
            this.message = 'Image uploaded successfully!';
          }
        },
        error: (err) => {
          this.message = 'Upload failed: ' + err.message;
        }
      });
    }
  }
  
  addBook() {
    if (!this.bookId || !this.bookName || !this.uploadedImagePath) {
      this.message = 'Please fill all fields and upload an image first!';
      return;
    }
    
    const newBook = {
      BookId: this.bookId,
      BookName: this.bookName,
      Price: this.bookPrice,
      Image: this.uploadedImagePath
    };
    
    this.http.post<any[]>('http://localhost:3000/books', newBook).subscribe({
      next: (data) => {
        this.books = data;
        this.message = 'Book added successfully!';
        // Reset form
        this.bookId = '';
        this.bookName = '';
        this.bookPrice = 0;
        this.uploadedImagePath = '';
        this.fileName = '';
      },
      error: (err) => {
        this.message = 'Error adding book: ' + err.message;
      }
    });
  }
  
  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }
  
  reset() {
    this.uploadProgress = 0;
    this.uploadSub = new Subscription();
  }

  // Hàm xác định URL ảnh dựa vào tên file
  // Ảnh cũ (b1-b5) lưu ở my-server (port 3000)
  // Ảnh mới upload lưu ở my-server-uploadfile (port 3001)
  getImageUrl(imageName: string): string {
    // Danh sách ảnh cũ lưu ở my-server
    const oldImages = ['b1.png', 'b2.png', 'b3.png', 'b4.png', 'b5.png'];
    
    if (oldImages.includes(imageName)) {
      // Ảnh cũ - lấy từ my-server (port 3000)
      return 'http://localhost:3000/images/' + imageName;
    } else {
      // Ảnh mới - lấy từ my-server-uploadfile (port 3001)
      return 'http://localhost:3001/image/' + imageName;
    }
  }
}

