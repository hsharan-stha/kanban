import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {LocalStorageService} from '@shared/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AppAuthService {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private httpClient: HttpClient
  ) {
  }

  public isLogin(): boolean {
    try {
      let token: any = this.localStorageService.getAccessToken();

      return token !== null;
    } catch (e) {
      return false;
    }
  }

  public logout(): void {
    this.localStorageService.clearStorage();
    this.router.navigate(['auth/login']);
  }

  public getLoggedInToken(): string | null {
    return this.localStorageService.getAccessToken();
  }

  /**
   * Fn. for Refresh Token
   * @param data : Login Data
   */
  public refreshToken(data: any): Observable<any> {
    const loginRequest = new FormData();
    return this.httpClient.post(
      `${environment.BASE_URL}auth/login`,
      loginRequest
         );
  }
}
