import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ExperienceItem } from '../services/about.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <h3>Experiencia</h3>
    <div *ngFor="let e of items">
      <strong>{{ e.position }}</strong> — {{ e.company }}
      <div>{{ e.startDate | date:'MMM yyyy' }} - {{ e.endDate ? (e.endDate | date:'MMM yyyy') : 'Actual' }}</div>
      <div *ngIf="e.responsibilities"><em>Responsabilidades:</em> {{ e.responsibilities }}</div>
      <div *ngIf="e.achievements"><em>Logros:</em> {{ e.achievements }}</div>
      <hr />
    </div>
  `
})
export class ExperienceComponent {
  @Input() items: ExperienceItem[] = [];
}
