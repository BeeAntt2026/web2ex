import { Component, OnInit } from '@angular/core';
import { BookAPIservice } from '../myservices/book-apiservice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-detail.component',
  standalone: false,
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  book: any;
  errMessage: string = '';

  constructor(
    private _service: BookAPIservice, 
    private router: Router, 
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRouter.params.subscribe(params => {
      const bookId = params['id'];
      if (bookId) {
        this.searchBook(bookId);
      }
    });
  }

  searchBook(bookId: string) {
    this._service.getBook(bookId).subscribe({
      next: (data) => { this.book = data; },
      error: (err) => { this.errMessage = err.message; }
    });
  }

  getImageUrl(imageName: string): string {
    if (!imageName) return '';
    const oldImages = ['b1.png', 'b2.png', 'b3.png', 'b4.png', 'b5.png', 'THCB.jpg', 'TH004.jpg', 'LTWeb2005.jpg'];
    if (oldImages.includes(imageName)) {
      return 'http://localhost:3000/images/' + imageName;
    }
    return 'http://localhost:3001/image/' + imageName;
  }

  goBack() {
    this.router.navigate(['/books']);
  }
}
