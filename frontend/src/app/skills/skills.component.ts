import { Component, Input } from '@angular/core';

import { SkillGroup } from '../services/about.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  template: `
    @for (group of skills; track group) {
      <div>
        <h3>{{ group.skillType }} Skills</h3>
        <div class="skills-list">
          <ul>
            @for (s of group.skills; track s) {
              <li class="skill-chip">{{ s.skillName }}</li>
            }
          </ul>
        </div>
      </div>
    }
    `,
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent {
  @Input() skills: SkillGroup[] = [];
}
