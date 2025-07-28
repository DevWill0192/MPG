import { Component, inject, signal, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  constructor() {}
    authService = inject(AuthService);
  private router = inject(Router);
  isVisible = false;

    currentUser = signal<unknown>(null)

  ngOnInit() {
    this.currentUser.set(this.authService.getUserData())
  }

  toggleMenu() {
    this.isVisible = !this.isVisible;
  }

 onLogout() {
  this.authService.logout().subscribe({
    next: () => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      this.currentUser.set(null);
      this.router.navigate(['/login']);
    },
    error: (err) => {
      console.error('Logout error:', err);
      // Aun así redirige, por si el token ya no es válido
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      this.currentUser.set(null);
      this.router.navigate(['/login']);
    }
  });
}
}
