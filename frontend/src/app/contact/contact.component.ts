import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService, ContactInfo, ContactMessage } from '../services/contact.service';

/**
 * Componente Contact
 * Muestra información de contacto (GET) y formulario para enviar mensaje (POST)
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ContactComponent.html',
  styleUrls: ['./ContactComponent.scss'],
})
export class ContactComponent implements OnInit {
  // Información de contacto obtenida del backend
  contactInfo: ContactInfo[] = [];

  // Variables del formulario de contacto
  ContactName: string = '';
  ContactEmail: string = '';
  ContactMessage: string = '';

  // Estados para feedback
  sending: boolean = false;
  success: boolean | null = null;

  constructor(private contactService: ContactService) {}

  // Trae la info de contacto al iniciar el componente
  ngOnInit(): void {
    this.contactService.getContactInfo().subscribe({
      next: (data) => this.contactInfo = data,
      error: (err) => console.error('Error loading contact info:', err)
    });
  }

  // Envía el mensaje de contacto
  onSubmit(): void {
    const message: ContactMessage = {
      ContactName: this.ContactName,
      ContactEmail: this.ContactEmail,
      ContactMessage: this.ContactMessage,
    };

    this.sending = true;
    this.contactService.sendMessage(message).subscribe({
      next: () => {
        this.success = true;
        this.sending = false;
        // Limpia el formulario
        this.ContactName = '';
        this.ContactEmail = '';
        this.ContactMessage = '';
        alert('Mensaje enviado exitosamente!');
      },
      error: () => {
        this.success = false;
        this.sending = false;
        alert('Error al enviar mensaje');
      },
    });
  }
}
