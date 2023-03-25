import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = `${environment.BASE_URL}auth/login`;

  constructor(private http: HttpClient) {}

  public userLogin(data: any): Observable<any> {
    let obj: any = {};
    obj['username'] = data['username'];
    obj['password'] = data['password'];

    return this.http.post(this.loginUrl, obj);
  }

  public getLanguageKey(): string | any {
    return localStorage.getItem('lang');
  }
}
