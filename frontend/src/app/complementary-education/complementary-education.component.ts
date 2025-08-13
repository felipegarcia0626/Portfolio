import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ComplementaryEducationItem } from '../services/about.service';

@Component({
  selector: 'app-complementary-education', // <-- Debe coincidir con lo usado en el HTML
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <h3>Cursos y certificaciones</h3>
    <ul>
      <li *ngFor="let c of items">
        <strong>{{ c.courseName }}</strong> — {{ c.institution }}
        ({{ c.issueDate | date:'MMM yyyy' }})
        <a *ngIf="c.credentialUrl" [href]="c.credentialUrl" target="_blank">Ver credencial</a>
      </li>
    </ul>
  `
})
export class ComplementaryEducationComponent {
  @Input() items: ComplementaryEducationItem[] = []; // <-- Input requerido para el binding
}
