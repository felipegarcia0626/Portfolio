import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillGroup } from '../services/about.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let group of skills">
      <h3>{{ group.skillType }} Skills</h3>
      <div class="skills-list">
        <ul>
          <li *ngFor="let s of group.skills" class="skill-chip">{{ s.skillName }}</li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent {
  @Input() skills: SkillGroup[] = [];
}
