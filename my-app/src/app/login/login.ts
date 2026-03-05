import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    // Read saved login cookie to pre-fill the form
    this._http.get<any>('/read-login-cookie').subscribe({
      next: (data) => {
        this.username = data.username || '';
        this.password = data.password || '';
        if (this.username) {
          this.message = 'Welcome back, ' + this.username + '! (loaded from cookie)';
        }
      },
      error: () => {}
    });
  }

  login(): void {
    const body = { username: this.username, password: this.password };
    this._http.post<any>('/login', body).subscribe({
      next: (data) => {
        this.message = data.message;
      },
      error: (err) => {
        this.message = 'Login error: ' + err.message;
      }
    });
  }
}
