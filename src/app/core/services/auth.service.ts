// auth.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { APP_CONSTANTS } from '../constants/app.constants';


interface LoginCredentials {
  'codigo-de-cliente': string;
  password: string;
}

interface LoginResponse {
  token: string;
  expiresIn: number;
  participant: User;
}

interface LogoutResponse {
  message?: string;
  [key: string]: unknown;
}

interface ApiError {
  status: number;
  error: {
    message: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = "https://vercel-cors-prox.vercel.app/api"

  // Señal para indicar cuando el usuario acaba de hacer login
  public showWelcomeToast = signal<boolean>(false);

  login(credentials: LoginCredentials, campaign: string): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      api_key: APP_CONSTANTS.STORAGE_KEYS.API_KEY,
      campaign: campaign,
      participation: credentials
    };

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, body, { headers }).pipe(
      map(response => {
        this.storeAuthData(response);
        this.showWelcomeToast.set(true);
        return response;
      }),
      catchError(error => {
        return throwError(() => this.handleLoginError(error));
      })
    );
  }

logout(): Observable<LogoutResponse> {
  const token = localStorage.getItem('auth_token');

  if (!token) {
    console.warn('No token found in localStorage');
    return throwError(() => new Error('No token'));
  }

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  return this.http.post<LogoutResponse>(`${this.apiUrl}/logout`, {}, { headers });
}


  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getUserData(): User | null {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  }

  private storeAuthData(response: LoginResponse): void {
    // Implementar lógica para almacenar token (localStorage, cookies, etc.)
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('user_data', JSON.stringify(response.participant));
  }

  private handleLoginError(error: ApiError): string {
    // Mapear errores específicos del backend a mensajes amigables
    console.error('Error de login:', error.error.message);
    if (error.status === 401) {
      // Si el error es de autenticación, mostrar un mensaje específico
      return 'Credenciales inválidas. Por favor, verifique su código de cliente y contraseña.';

    } else if (error.status === 400) {
      return 'Datos de solicitud inválidos.';
    } else if (error.status === 0) {
      return 'No se pudo conectar al servidor. Verifique su conexión a internet.';
    } else {
      return error.error.message;
    }

  }
}
