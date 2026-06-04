import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header>
      <div class="container">
        <nav class="d-flex justify-between align-center">
          <div>
            <h1>Angular BFF Auth</h1>
          </div>
          <div>
            <a routerLink="/" routerLinkActive="active">Home</a>
            <ng-container *ngIf="(isAuthenticated$ | async); else notAuth">
              <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
              <button (click)="logout()" class="btn btn-logout">Logout</button>
            </ng-container>
            <ng-template #notAuth>
              <a routerLink="/login" routerLinkActive="active">Login</a>
            </ng-template>
          </div>
        </nav>
      </div>
    </header>

    <main class="container">
      <router-outlet></router-outlet>
    </main>

    <footer>
      <p>&copy; 2024 Angular BFF Authentication. All rights reserved.</p>
    </footer>
  `,
  styles: [`
    header nav h1 {
      margin: 0;
      font-size: 24px;
    }

    .btn-logout {
      background-color: #e74c3c;
    }

    .btn-logout:hover {
      background-color: #c0392b;
    }
  `]
})
export class AppComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  logout(): void {
    this.authService.logout();
  }
}
