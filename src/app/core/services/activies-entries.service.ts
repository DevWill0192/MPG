import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { APP_CONSTANTS } from '../constants/app.constants';

interface DateFilter {
  sdate: string;
  edate: string;
}

interface RequestBody {
  api_key: string;
  campaign: string;
  date_filter: DateFilter;
  _type: string;
  atype: string;
}

interface EntryData {
  data?: {
    [key: string]: string | number;
  };
}

interface ApiResponse {
  data?: {
    entries?: EntryData[];
  };
  [key: string]: unknown;
}

@Injectable({
  providedIn: 'root'
})
export class ActiviesEntriesService {
  private http = inject(HttpClient);
  private apiUrl = "https://vercel-cors-prox.vercel.app/api"

  activiesEntries(): Observable<ApiResponse> {
    const token = localStorage.getItem('auth_token');
    console.log('Token disponible:', !!token);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body: RequestBody = {
      "api_key": APP_CONSTANTS.STORAGE_KEYS.API_KEY,
      "campaign": "4u",
      "date_filter": {
        "sdate": "2024-08-01",
        "edate": "2024-08-31"
      },
      "_type": "External",
      "atype": "avance_metas"
    };

    console.log('Enviando request con body:', body);

    return this.http.post<ApiResponse>(`${this.apiUrl}/entries`, body, { headers }).pipe(
      map(response => {
        console.log('Respuesta del API:', response);
        return response;
      }),

      catchError(error => {
        console.error('Error fetching activities entries:', error);
        return throwError(() => new Error('Failed to fetch activities entries'));
      })
    );
  }
}
