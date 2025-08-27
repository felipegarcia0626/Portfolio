import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

export type EducationItem = {
  institution: string;
  degree: string;
  range: string;
  notes?: string[];
};

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [MatCardModule],
  template: `
  <div>
    @for (ed of items; track ed) {
      <mat-card class="edu">
        <div class="header">
          <h3 class="inst">{{ ed.institution }}</h3>
          <div class="range">{{ ed.range }}</div>
        </div>
        <div class="degree">{{ ed.degree }}</div>

        @if (ed.notes?.length) {
          <ul class="notes">
            @for (n of ed.notes; track n) { <li>{{ n }}</li> }
          </ul>
        }
      </mat-card>
    }
  </div>
  `,
  styles: [`
  @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
  .edu { background: #181c24; padding: 0px 5px 20px 0px; }
  .header { display:flex; gap:12px; align-items:flex-start; }
  .inst { margin:0; font-size:1.05rem; }
  .range { margin-left:auto; color: var(--sub, #a6afbd); font-size:.9rem; white-space:nowrap; }
  .degree { color: var(--sub, #a6afbd); margin-top:2px; }
  .notes { margin: 8px 0 0 18px; padding:0; }
  `]
})
export class EducationComponent {
  @Input() items: EducationItem[] = [];
}