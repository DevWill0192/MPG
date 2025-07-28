import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/interfaces/user.interface';
import { MenuComponent } from '../menu/menu.component';
import { ToashComponent } from "../toash/toash.component";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule, MenuComponent, ToashComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  private router = inject(Router);

  currentUser = signal<User | null>(null)
  // Usar la señal del AuthService para mostrar el toast
  showNotificatios = this.authService.showWelcomeToast;

  ngOnInit() {
    this.currentUser.set(this.authService.getUserData())
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
