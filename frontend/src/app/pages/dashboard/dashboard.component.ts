import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';
import { Observable } from 'rxjs';

interface User {
  sub: string;
  name: string;
  email: string;
  claims: { type: string; value: string }[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h2>Dashboard</h2>
      <p>This is a protected page. Only authenticated users can access it.</p>

      <div class="alert alert-success mt-20">
        <p>You are authenticated and can view this dashboard.</p>
      </div>

      <div class="card mt-20">
        <h3>User Information</h3>
        <div *ngIf="currentUser$ | async as user">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                <strong>Name:</strong>
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                {{ user.name }}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                <strong>Email:</strong>
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                {{ user.email }}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                <strong>Subject ID:</strong>
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                {{ user.sub }}
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div class="card mt-20">
        <h3>All Claims</h3>
        <div *ngIf="currentUser$ | async as user">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f0f0f0;">
                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">
                  Type
                </th>
                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let claim of user.claims">
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                  {{ claim.type }}
                </td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                  {{ claim.value }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {
  currentUser$!: Observable<User | null>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser$ = this.authService.currentUser$;
  }
}
