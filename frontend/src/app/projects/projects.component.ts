import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService, Project } from '../services/projects.service';

/**
 * Componente Projects
 * Standalone: carga bajo demanda (lazy loading)
 * Muestra los proyectos obtenidos del backend
 */
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  // Variable para almacenar la lista de proyectos
  projects: Project[] = [];
  loading = true;
  error = false;

  // Inyección del servicio ProjectsService para obtener datos
  constructor(private projectsService: ProjectsService) {}

  // Al iniciar, solicita la lista de proyectos al backend
  ngOnInit(): void {
    this.projectsService.getProjects().subscribe({
      next: (data) => { this.projects = data; this.loading = false; },
      error: () => { this.error = true; this.loading = false; }
    });
  }
}