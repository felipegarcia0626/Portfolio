import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutService, AboutProfile } from '../services/about.service';
import { SkillsComponent } from '../skills/skills.component';
import { ExperienceComponent } from '../experience/experience.component';
import { EducationComponent } from '../education/education.component';
import { ComplementaryEducationComponent } from '../complementary-education/complementary-education.component';
/**
 * Componente About
 * Standalone: no depende de un módulo tradicional
 * Se encarga de mostrar la información personal/profesional
 */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SkillsComponent, ExperienceComponent, EducationComponent, ComplementaryEducationComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
}) 

export class AboutComponent implements OnInit {
  // Variable para almacenar la información obtenida del backend
  about: AboutProfile | null = null;
  loading = true;
  error = false;

  // Inyección del servicio AboutService para obtener datos del backend
  constructor(private aboutService: AboutService) {}

  // ngOnInit se ejecuta automáticamente cuando el componente se crea
  ngOnInit(): void {
    // Llamada al servicio para obtener datos de "About"
    this.aboutService.getAboutProfile().subscribe({
      next: (data) => { this.about = data; this.loading = false; },
      error: () => { this.error = true; this.loading = false; }
    });
  }
  downloadCV(): void {
    if (this.about?.cvUrl) window.open(this.about.cvUrl, '_blank');
  }
}