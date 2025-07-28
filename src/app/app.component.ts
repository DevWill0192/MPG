import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <div class="app-container">
      <app-header *ngIf="authService.isLoggedIn()"></app-header>

      <main class="main-content">
        <router-outlet></router-outlet>
      </main>

      <app-footer class="footer" *ngIf="authService.isLoggedIn()" ></app-footer>
    </div>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  authService = inject(AuthService);
}
