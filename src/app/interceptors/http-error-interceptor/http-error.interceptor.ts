import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '@shared/services/alertifyjs/alertify.service';
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  private excludeUrls = ['/gateway/document'];

  constructor(
    private router: Router,
    private alertify: AlertifyService,
    private localStorageService: LocalStorageService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.body.message && request.method == 'POST') {
            if (
              !this.excludeUrls.some((url: any) => request.url.includes(url))
            ) {
              this.alertify.message(event.body.message);
            }
          }
        }
      }),
      catchError((err) => {
        const error = err.error.message ? err.error.message : err.error.error;

        if ([401].indexOf(err.status) !== -1) {
          this.localStorageService.clearStorage();
          this.router.navigate(['/auth']);
          this.alertify.error(error);
        } else if ([400, 408, 424, 403].indexOf(err.status) !== -1) {
          if (err.error.message != '') {
            this.alertify.error(err.error.message);
          }
        } else if ([404].indexOf(err.status) !== -1) {
          this.alertify.error('Internal Server Error');
        } else if ([500].indexOf(err.status) !== -1) {
          if (error) {
            this.alertify.error(error);
          }
        } else if ([503].indexOf(err.status) !== -1) {
          this.alertify.error('503 Service Unavailable');
        }
        return throwError(err);
      })
    );
  }
}
