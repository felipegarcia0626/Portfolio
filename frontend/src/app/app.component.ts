import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Componente principal de la aplicación.
 * Renderiza la navegación y muestra el componente de la ruta seleccionada.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <nav>
      <a routerLink="/about" routerLinkActive="active-link">About</a> |
      <a routerLink="/projects" routerLinkActive="active-link">Projects</a> |
      <a routerLink="/contact" routerLinkActive="active-link">Contact</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    nav { margin-bottom: 20px; font-size: 1.1em; }
    .active-link { font-weight: bold; color: #1976d2; }
  `]
})
export class AppComponent {}

