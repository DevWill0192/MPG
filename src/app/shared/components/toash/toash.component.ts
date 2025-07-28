import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-toash',
  imports: [],
  templateUrl: './toash.component.html',
  styleUrl: './toash.component.scss'
})
export class ToashComponent {
 authService = inject(AuthService);
  showNotificatios = this.authService.showWelcomeToast;
  closeToast() {
   this.showNotificatios.set(false)
  }
}
