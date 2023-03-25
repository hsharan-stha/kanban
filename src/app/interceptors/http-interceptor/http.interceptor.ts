import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {AppAuthService} from '@shared/services/auth-services/app-auth.service';
import {LocalStorageService} from '@shared/services/local-storage/local-storage.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  private excludeUrls = [];

  /**
   * Access Token
   */
  private token: any = '';

  /**
   * api request count
   * @private
   */
  private pendingRequestsCount: number = 0;

  constructor(
    private authService: AppAuthService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService
  ) {
  }

  /**
   * Appends JWT Token on each HttRequest
   * @param  {HttpRequest<any>} req
   * @param  {HttpHandler}      next
   * @return {Observable}
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    /**
     * Fetch Access token
     */
    this.token = this.authService.getLoggedInToken();
    /**
     * Attach Token on Header if user already logged-in
     */

    if (this.authService.isLogin()) {
      let bearerToken = '';
      bearerToken = `Bearer ${this.token}`;

      req = req.clone({
        setHeaders: {
          'accept-language': this.localStorageService.getLanguageKey(),
          Authorization: bearerToken,
        },
      });

      // Show Spinner
      this.pendingRequestsCount++;

      if (!this.excludeUrls.some((url: any) => req.url.includes(url))) {
        this.spinner.show();
      }
    } else {
      this.pendingRequestsCount++;
      this.spinner.show();
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.pendingRequestsCount--;
        if (this.pendingRequestsCount < 1) {
          this.spinner.hide();
        }
      })
    );
  }
}
