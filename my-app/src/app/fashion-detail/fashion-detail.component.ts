import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FashionApiservice } from '../myservices/fashion-apiservice';

@Component({
  selector: 'app-fashion-detail',
  standalone: false,
  templateUrl: './fashion-detail.component.html',
  styleUrls: ['./fashion-detail.component.css'],
})
export class FashionDetailComponent implements OnInit {
  fashion: any;
  errMessage: string = '';
  fashionId: string = '';

  constructor(
    private _service: FashionApiservice,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRouter.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.fashionId = id;
        this.searchFashion();
      }
    });
  }

  searchFashion(): void {
    if (!this.fashionId) return;
    this.fashion = null;
    this.errMessage = '';
    this._service.getFashion(this.fashionId).subscribe({
      next: (data) => { this.fashion = data; },
      error: (err) => { this.errMessage = err.message || 'Không tìm thấy fashion'; }
    });
  }

  goBack(): void {
    this.router.navigate(['/fashion']);
  }
}
