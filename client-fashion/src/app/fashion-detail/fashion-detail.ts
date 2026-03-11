import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FashionApiService } from '../../../myservices/fashion-api-service';

@Component({
  selector: 'app-fashion-detail',
  standalone: false,
  templateUrl: './fashion-detail.html',
  styleUrl: './fashion-detail.css',
})
export class FashionDetail implements OnInit {
  fashion: any;
  errMessage: string = '';

  constructor(
    private _service: FashionApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this._service.getFashion(id).subscribe({
      next: (data: any) => { this.fashion = data; },
      error: (err: any) => { this.errMessage = err; }
    });
  }

  goBack(): void {
    this.router.navigate(['/fashion-list']);
  }
}