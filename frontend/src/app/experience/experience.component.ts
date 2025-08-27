import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

export type ExperienceItem = {
  role: string;
  company: string;
  range: string;               // "Oct 2022 — Actual"
  responsibilities?: string[]; // bullets
  stack?: string[];            // opcional
};

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [MatCardModule],
  template: `
  <div>
    @for (e of items; track e) {
      <mat-card class="exp">
        <div class="header">
          <h3 class="role">{{ e.role }}</h3>
          <div class="range">{{ e.range }}</div>
        </div>
        <div class="company">{{ e.company }}</div>

        @if (e.responsibilities?.length) {
          <ul class="bullets">
            @for (b of e.responsibilities; track b; let i = $index) {
              @if (i < 3) { <li>{{ b }}</li> }
            }
          </ul>
        }
      </mat-card>
    }
  </div>
  `,
  styles: [`
  @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
  .exp { background: #181c24; padding: 0px 5px 20px 0px;}
  .header { display:flex; gap:12px; align-items:flex-start; }
  .role { margin:0; font-size: 1.05rem; line-height:1.4; }
  .range { margin-left:auto; color: var(--sub, #a6afbd); font-size:.9rem; white-space:nowrap; }
  .company { color: var(--sub, #a6afbd); margin-top:2px; }
  .bullets { margin: 8px 0 0 18px; padding:0; }
  `]
})
export class ExperienceComponent {
  @Input() items: ExperienceItem[] = [];
}