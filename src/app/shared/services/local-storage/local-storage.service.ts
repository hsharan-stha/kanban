import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public setLanguageKey(key: string) {
    localStorage.setItem('lang', key);
  }

  public getLanguageKey(): string | any {
    return localStorage.getItem('lang');
  }

  public setAccessToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  public setRefreshToken(token: string): void {
    localStorage.setItem('refresh_token', token);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  public clearStorage(): void {
    localStorage.clear();
    this.setLanguageKey('en');
  }

  public setLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getLocalStorage(key: string): string {
    return localStorage.getItem(key) || '';
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
