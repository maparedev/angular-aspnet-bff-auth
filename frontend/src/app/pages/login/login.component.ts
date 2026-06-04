import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card" style="max-width: 400px; margin: 0 auto;">
      <h2>Login</h2>
      
      <div *ngIf="errorMessage" class="alert alert-error">
        {{ errorMessage }}
      </div>

      <form (ngSubmit)="onSubmit()" class="mt-20">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            [(ngModel)]="username"
            name="username"
            placeholder="Enter your username"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            [(ngModel)]="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" [disabled]="isLoading">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <div class="mt-20" style="border-top: 1px solid #ddd; padding-top: 20px;">
        <p class="text-muted">Demo credentials:</p>
        <p><strong>Username:</strong> admin or user</p>
        <p><strong>Password:</strong> password</p>
      </div>
    </div>
  `,
  styles: [`
    .btn {
      width: 100%;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter username and password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Invalid username or password';
        console.error('Login error:', error);
      }
    });
  }
}
