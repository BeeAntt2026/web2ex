import { Component } from '@angular/core';
import { BookAPIservice } from '../myservices/book-apiservice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-detail.component',
  standalone: false,
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent {
  book:any;
errMessage:string=''
constructor(private _service: BookAPIservice, private router: Router, private activeRouter: ActivatedRoute){
  this.activeRouter.params.subscribe(params => {
    const bookId = params['id'];
    if (bookId) {
      this.searchBook(bookId);
    }
  });
}
searchBook(bookId:string)
{
this._service.getBook(bookId).subscribe({
next:(data)=>{this.book=data},
error:(err)=>{this.errMessage=err.message}
})
}
}
