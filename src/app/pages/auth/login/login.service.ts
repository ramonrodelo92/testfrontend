import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from './interfaces/user';
import { UserLogin } from './interfaces/userLogin';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) {}

  login(user: User): Observable<UserLogin> {
    return this.http.post<UserLogin>(`${this.API_URL}/login`, user).pipe(
      tap({
        next: (response) => {
          this.saveSession(response);
        },
      })
    );
  }

  saveSession(user: UserLogin) {
    localStorage.setItem('user_info', JSON.stringify(user));
  }

  getSession(): UserLogin {
    return JSON.parse(localStorage.getItem('user_info') as string);
  }

  isAuth(): boolean {
    const session = this.getSession();

    if (session?.access_token) {
      this.router.navigateByUrl('/');
      return true;
    }

    return false;
  }

  isLoggedIn() {
    if (!this.isAuth()) {
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
  }

  removeSession() {
    localStorage.removeItem('user_info');
  }
}
