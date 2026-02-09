import { Component, OnInit } from '@angular/core';
import { BookAPIservice } from '../myservices/book-apiservice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books implements OnInit {
  books: any;
  errMessage: string = '';

  constructor(
    private _service: BookAPIservice, 
    private router: Router, 
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    console.log('Loading books...');
    this._service.getBooks().subscribe({
      next: (data) => { 
        console.log('Books loaded:', data);
        this.books = data;
      },
      error: (err) => { 
        console.error('Error loading books:', err);
        this.errMessage = err;
      }
    });
  }

  viewBookDetail(bookId: string) {
    console.log('Navigating to book detail with ID:', bookId);
    this.router.navigate(['/books/detail', bookId]);
  }

  navigateToCreate() {
    this.router.navigate(['/books/create']);
  }

  editBook(bookId: string) {
    this.router.navigate(['/books/edit', bookId]);
  }

  // Xóa sách với xác nhận
  deleteBook(bookId: string) {
    if (confirm('Bạn có chắc muốn xóa sách này?')) {
      this._service.deleteBook(bookId).subscribe({
        next: () => {
          alert('Xóa thành công!');
          this.loadBooks(); // Tải lại danh sách
        },
        error: (err) => console.error(err)
      });
    }
  }

  // Helper xử lý URL ảnh
  getImageUrl(imageName: string): string {
    if (!imageName) return '';
    const oldImages = ['b1.png', 'b2.png', 'b3.png', 'b4.png', 'b5.png'];
    if (oldImages.includes(imageName)) {
      return 'http://localhost:3000/images/' + imageName;
    }
    return 'http://localhost:3001/images/' + imageName;
  }
}