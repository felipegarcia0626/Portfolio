import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EducationItem } from '../services/about.service';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <h3>Educación</h3>
    <div *ngFor="let ed of items">
      <strong>{{ ed.degree }}</strong> — {{ ed.institution }}
      <div>{{ ed.startDate | date:'MMM yyyy' }} - {{ ed.endDate | date:'MMM yyyy' }}</div>
      <div *ngIf="ed.description">{{ ed.description }}</div>
      <hr />
    </div>
  `
})
export class EducationComponent {
  @Input() items: EducationItem[] = [];
}
