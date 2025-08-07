import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface que representa la estructura del objeto devuelto por el backend
export interface AboutInfo {
  PortfolioName: string;
  PortfolioTitle: string;
  PortfolioDescription: string;
}

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(private http: HttpClient) {}

  // Llama al endpoint /api/about y retorna un observable con los datos
  getAbout(): Observable<AboutInfo> {
    return this.http.get<AboutInfo>('/api/about');
  }
}

