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
  books:any;
  errMessage:string='';
  constructor(private _service: BookAPIservice, private router: Router, private activeRouter: ActivatedRoute){
  }

  ngOnInit(): void {
    this._service.getBooks().subscribe({
      next:(data)=>{this.books=data},
      error:(err)=>{this.errMessage=err}
    })
  }

viewBookDetail(bookId:string){
  console.log('Navigating to book detail with ID:', bookId);
  this.router.navigate(['/ex41', bookId]);
}
}
