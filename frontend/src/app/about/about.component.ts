import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutService, AboutInfo } from '../services/about.service';

/**
 * Componente About
 * Standalone: no depende de un módulo tradicional
 * Se encarga de mostrar la información personal/profesional
 */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  // Variable para almacenar la información obtenida del backend
  aboutData: AboutInfo | null = null;

  // Inyección del servicio AboutService para obtener datos del backend
  constructor(private aboutService: AboutService) {}

  // ngOnInit se ejecuta automáticamente cuando el componente se crea
  ngOnInit(): void {
    // Llamada al servicio para obtener datos de "About"
    this.aboutService.getAbout().subscribe({
      next: (data: any) => {
        // ✅ Toma el primer objeto del array
        this.aboutData = Array.isArray(data) ? data[0] : data;
        console.log('📦 aboutData:', this.aboutData);
      },
    });
  }
}