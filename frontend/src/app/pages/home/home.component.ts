import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { Observable } from 'rxjs';

interface User {
  sub: string;
  name: string;
  email: string;
  claims: { type: string; value: string }[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="card">
      <h2>Welcome to Angular BFF Authentication</h2>
      <p>This application demonstrates Backend-for-Frontend (BFF) pattern with cookie-based authentication.</p>

      <ng-container *ngIf="(isAuthenticated$ | async); else notAuthMessage">
        <div class="alert alert-success">
          <h3>You are logged in!</h3>
          <p *ngIf="currentUser$ | async as user">
            Welcome, {{ user.name }}! ({{ user.email }})
          </p>
        </div>

        <div class="card mt-20">
          <h3>Your Profile</h3>
          <div *ngIf="currentUser$ | async as user" class="mt-20">
            <p><strong>Name:</strong> {{ user.name }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Subject:</strong> {{ user.sub }}</p>
            
            <h4>Claims</h4>
            <ul>
              <li *ngFor="let claim of user.claims">
                {{ claim.type }}: {{ claim.value }}
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-20">
          <a routerLink="/dashboard" class="btn">Go to Dashboard</a>
        </div>
      </ng-container>

      <ng-template #notAuthMessage>
        <div class="alert alert-info">
          <h3>Not Logged In</h3>
          <p>Please log in to access your dashboard and view your profile.</p>
          <a routerLink="/login" class="btn mt-20">Login Now</a>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .btn {
      display: inline-block;
      padding: 10px 20px;
      background-color: #3498db;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      border: none;
      cursor: pointer;
    }

    .btn:hover {
      background-color: #2980b9;
    }
  `]
})
export class HomeComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;
  currentUser$!: Observable<User | null>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.currentUser$ = this.authService.currentUser$;
  }
}
