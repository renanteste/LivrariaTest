import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AuthResponse {
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  private tokenSubject = new BehaviorSubject<string | null>(this.getStoredToken());

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          this.storeToken(response.token);
          this.tokenSubject.next(response.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.tokenSubject.next(null);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  private getStoredToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
