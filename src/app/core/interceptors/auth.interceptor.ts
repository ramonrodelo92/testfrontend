import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from 'src/app/pages/auth/login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private sessionService: LoginService, private router: Router) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const session = this.sessionService.getSession();
    let cleanedParams = new HttpParams();

    req.params.keys().forEach((x) => {
      if (req.params.get(x) != undefined)
        cleanedParams = cleanedParams.append(x, req.params.get(x) as string);
    });

    if (session) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${session.access_token}`,
        },
        params: cleanedParams,
      });
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          //this.router.navigate(['/pages/not-found']);
        } else if (err.status === 401 || err.status === 403) {
          this.sessionService.removeSession();
          this.router.navigate(['/login']);
        }

        return throwError(err);
      })
    );
  }
}
