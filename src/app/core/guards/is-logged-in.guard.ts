import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from 'src/app/pages/auth/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedInGuard implements CanActivate {
  constructor(private sessionService: LoginService, private router: Router) {}
  canActivate(): boolean | Promise<boolean> {
    const token = this.sessionService.getSession();

    if (token?.access_token) {
      this.router.navigate(['/']);
      return false;
    }
    
    return true;
  }
}
