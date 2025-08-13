import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService, ContactInfo, ContactMessage } from '../services/contact.service';

/**
 * Componente Contact
 * Muestra información de contacto (GET) y formulario para enviar mensaje (POST)
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  // Información de contacto obtenida del backend
  contactInfo: ContactInfo[] = [];

  // Variables del formulario de contacto
  contactName: string = '';
  contactEmail: string = '';
  contactMessage: string = '';

  // Estados para feedback
  sending: boolean = false;
  success: boolean | null = null;
  loading = true;
  error = false;
  

  constructor(private contactService: ContactService) {}

  // Trae la info de contacto al iniciar el componente
  ngOnInit(): void {
    this.contactService.getContactInfo().subscribe({
      next: (data) => { this.contactInfo = data; this.loading = false; },
      error: () => { this.error = true; this.loading = false; }
    });
  }

  // Envía el mensaje de contacto
  onSubmit(): void {
    const msg: ContactMessage = {
      contactName: this.contactName,
      contactEmail: this.contactEmail,
      contactMessage: this.contactMessage,
    };
    this.sending = true;
    this.contactService.sendMessage(msg).subscribe({
      next: () => {
        this.success = true; this.sending = false;
        this.contactName = ''; this.contactEmail = ''; this.contactMessage = '';
      },
      error: () => { this.success = false; this.sending = false; }
    });
  }
}
