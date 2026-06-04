import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface User {
  sub: string;
  name: string;
  email: string;
  claims: { type: string; value: string }[];
}

interface AuthResponse {
  isAuthenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:5001/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  checkAuthStatus(): void {
    this.http.get<AuthResponse>(`${this.apiUrl}/auth/is-authenticated`, {
      withCredentials: true
    }).subscribe({
      next: (response) => {
        this.isAuthenticatedSubject.next(response.isAuthenticated);
        if (response.isAuthenticated) {
          this.loadUserInfo();
        }
      },
      error: () => {
        this.isAuthenticatedSubject.next(false);
      }
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { username, password }, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.checkAuthStatus();
      })
    );
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/auth/logout`, {}, {
      withCredentials: true
    }).subscribe({
      next: () => {
        this.isAuthenticatedSubject.next(false);
        this.currentUserSubject.next(null);
        window.location.href = '/';
      },
      error: () => {
        this.isAuthenticatedSubject.next(false);
        this.currentUserSubject.next(null);
        window.location.href = '/';
      }
    });
  }

  loadUserInfo(): void {
    this.http.get<User>(`${this.apiUrl}/auth/user`, {
      withCredentials: true
    }).subscribe({
      next: (user) => {
        this.currentUserSubject.next(user);
      },
      error: () => {
        this.currentUserSubject.next(null);
      }
    });
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser$;
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$;
  }
}
