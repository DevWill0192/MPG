import { Component, inject } from "@angular/core"
import { Router } from "@angular/router"
import { AuthService } from "../../core/services/auth.service"
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common"
import { InputComponent } from "../../shared/components/input/input.component";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent,],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);


  // Traditional properties for two-way binding with ngModel
  email: string = ""
  password: string = ""

  // Using signals for reactive state management
  loginForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  termsAccepted = false;
privacyAccepted = false;

  constructor() {
    this.loginForm = this.fb.group({
      clientCode: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      campaign: ['4u', [Validators.required]]
    });
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const credentials = {
      'codigo-de-cliente': this.loginForm.value.clientCode,
      password: this.loginForm.value.password
    };

    this.authService.login(credentials, this.loginForm.value.campaign).subscribe({
      next: (response) => {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user', JSON.stringify(response?.participant));
        // Redirigir al home después del login exitoso
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = error || 'Error al iniciar sesión. Por favor intenta de nuevo.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });

  }

}
