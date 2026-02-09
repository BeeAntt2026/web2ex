import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook } from '../myclasses/iBook';
import { BookAPIservice } from '../myservices/book-apiservice';

@Component({
  selector: 'app-book-form',
  standalone: false,
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookForm implements OnInit {
  book: IBook = { 
    BookId: '', 
    Tensach: '', 
    Giaban: 0, 
    Mota: '', 
    Anhbia: '', 
    Ngaycapnhat: '', 
    Soluongton: 0, 
    MaCD: 0, 
    MaNXB: 0 
  };
  isEditMode = false;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookAPIservice
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.bookService.getBook(id).subscribe({
        next: (data: IBook) => this.book = data,
        error: (err: any) => console.error('Error loading book:', err)
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.uploadImage();
    }
  }

  uploadImage() {
    if (!this.selectedFile) return;
    
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    
    fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      this.book.Anhbia = data.filename;
      alert('Upload ảnh thành công!');
    })
    .catch(err => console.error('Upload error:', err));
  }

  onSubmit() {
    // Set current date if creating new
    if (!this.isEditMode) {
      this.book.Ngaycapnhat = new Date().toLocaleDateString('vi-VN');
    }

    if (this.isEditMode) {
      this.bookService.putBook(this.book.BookId, this.book).subscribe({
        next: () => {
          alert('Cập nhật sách thành công!');
          this.router.navigate(['/books']);
        },
        error: (err: any) => console.error('Error updating book:', err)
      });
    } else {
      this.bookService.postBook(this.book).subscribe({
        next: () => {
          alert('Thêm sách thành công!');
          this.router.navigate(['/books']);
        },
        error: (err: any) => console.error('Error creating book:', err)
      });
    }
  }

  cancel() {
    this.router.navigate(['/books']);
  }

  getImageUrl(imageName: string): string {
    if (!imageName) return '';
    const oldImages = ['b1.png', 'b2.png', 'b3.png', 'b4.png', 'b5.png'];
    if (oldImages.includes(imageName)) {
      return 'http://localhost:3000/images/' + imageName;
    }
    return 'http://localhost:3001/image/' + imageName;
  }
}
