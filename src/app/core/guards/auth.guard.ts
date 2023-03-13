import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from 'src/app/pages/auth/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private sessionService: LoginService, private router: Router) {}
  canActivate(): boolean | Promise<boolean> {
    const session = this.sessionService.getSession();

    if (session?.access_token) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
