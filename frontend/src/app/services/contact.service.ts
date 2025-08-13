import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Estructura para la info de contacto mostrada (GET /api/contact)
export interface ContactInfo {
  infoLabel: string;
  infoValue: string;
  icon: string;
  orderIndex: number;
}

// Estructura para el mensaje enviado (POST /api/contact)
export interface ContactMessage {
  contactName: string;
  contactEmail: string;
  contactMessage: string;
}

/**
 * Servicio para obtener información de contacto y enviar mensajes
 */
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene la información de contacto del endpoint /api/contact (GET)
   */
  getContactInfo(): Observable<ContactInfo[]> {
    return this.http.get<ContactInfo[]>('/api/contact');
  }

  /**
   * Envía un mensaje de contacto al endpoint /api/contact (POST)
   */
  sendMessage(message: ContactMessage): Observable<any> {
    return this.http.post('/api/contact', message);
  }
}
