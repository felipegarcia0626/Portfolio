// frontend/src/app/about/about.component.ts
import { Component, ElementRef, OnDestroy, OnInit, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { MatCardModule }    from '@angular/material/card';
import { MatButtonModule }  from '@angular/material/button';
import { MatIconModule }    from '@angular/material/icon';
import { MatChipsModule }   from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

import { SectionTocComponent, TocItem } from '../shared/section-toc/section-toc.component';
import { AboutService, AboutProfile }   from '../services/about.service';

// TIPOS esperados componentes de UI (vista)
import { ExperienceComponent, ExperienceItem as ExpVM } from '../experience/experience.component';
import { EducationComponent,  EducationItem  as EduVM } from '../education/education.component';
import { ComplementaryEducationComponent }              from '../complementary-education/complementary-education.component';

import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-about',
  standalone: true,
  // Belt-and-suspenders: proveemos el servicio aquí aunque también esté providedIn:'root'
  providers: [AboutService],
  imports: [
    MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatDividerModule,
    SectionTocComponent,
    ExperienceComponent, EducationComponent, ComplementaryEducationComponent
  ],
  template: `
  <div class="about-layout">
    <div class="toc-col">
      <app-section-toc
        [sections]="toc"
        [activeId]="activeSectionId"
        (goto)="scrollTo($event)">
      </app-section-toc>
    </div>

    <section class="content">
      <!-- HERO -->
      <mat-card class="glass hero">
        <img class="avatar" [src]="about?.avatarUrl || '/assets/avatar.jpg'" alt="Avatar" />
        <div class="identity">
          <h1 class="title">{{ about?.portfolioName || 'Portfolio – About' }}</h1>
          <p class="muted">{{ about?.city || '—' }}</p>
          <div class="actions">
            <button mat-raised-button color="primary" (click)="openCV(about?.cvUrl)">Download CV</button>
            <a mat-stroked-button color="accent" href="https://www.linkedin.com/in/luis-felipe-garcia-sql-excel-powerbi-data"
               target="_blank" rel="noopener">
              <mat-icon>open_in_new</mat-icon> LinkedIn
            </a>
            <a mat-stroked-button color="accent" href="https://github.com/felipegarcia0626/"
               target="_blank" rel="noopener">
              <mat-icon>open_in_new</mat-icon> GitHub
            </a>
          </div>
        </div>
      </mat-card>

      <!-- PERFIL -->
      <mat-card class="glass section" #section id="profile">
        <h2 class="h2">Perfil</h2>
        @if (about?.profileDescription) {
          <p class="summary">{{ about!.profileDescription }}</p>
        } @else {
          <p class="summary muted">Cargando perfil…</p>
        }
      </mat-card>

      <!-- EXPERIENCIA (mapeada a ExpVM[]) -->
      <mat-card class="glass section" #section id="experience">
        <h2 class="h2">Experiencia</h2>
        @if (experienceVM().length) {
          <app-experience [items]="experienceVM()"></app-experience>
        } @else {
          <div class="placeholder">Cargando experiencia…</div>
        }
      </mat-card>

      <!-- EDUCACIÓN (mapeada a EduVM[]) -->
      <mat-card class="glass section" #section id="education">
        <h2 class="h2">Educación</h2>
        @if (educationVM().length) {
          <app-education [items]="educationVM()"></app-education>
        } @else {
          <div class="placeholder">Cargando educación…</div>
        }
      </mat-card>

      <!-- COMPLEMENTARIA & CERTIFICACIONES -->
      <mat-card class="glass section" #section id="certs">
        <h2 class="h2">Educación complementaria y certificaciones</h2>
        @if (complementaryVM().length) {
          <app-complementary-education [items]="complementaryVM()"></app-complementary-education>
        } @else {
          <div class="placeholder">Cargando complementaria…</div>
        }
      </mat-card>

      <!-- LOGROS -->
      <mat-card class="glass section" #section id="achievements">
        <h2 class="h2">Logros</h2>
        @if (achievementsText().length) {
          <div class="logros">
            @for (ach of achievementsText(); track ach) {
              <div class="list-item">• {{ ach }}</div>
            }
          </div>
        } @else {
          <div class="placeholder">Cargando logros…</div>
        }
      </mat-card>

      <!-- SKILLS (normalizado por si cambia el servicio) -->
      <mat-card class="glass section" #section id="skills">
        <h2 class="h2">Skills</h2>
        @for (g of normalizedSkills(); track g.groupName) {
          <section class="skill-group">
            <h3 class="h3">{{ g.groupName }}</h3>
            <mat-chip-set aria-label="skills">
              @for (s of g.items; track s) { <mat-chip selected>{{ s }}</mat-chip> }
            </mat-chip-set>
          </section>
        }
        @if (!normalizedSkills().length) {
          <div class="placeholder">Cargando skills…</div>
        }
      </mat-card>
    </section>
  </div>
  `,
  styles: [`
  .about-layout { display:grid; grid-template-columns: 260px 1fr; gap: 24px; align-items: start; }
  .toc-col { position: sticky; top: 16px; align-self: start;  height: fit-content; }
  @media (max-width: 1024px) { .about-layout { grid-template-columns: 1fr; } .toc-col { position: static; }}
  .content { display:grid; gap: 20px; padding-right: 30px; }
  .glass { background: var(--card, #181c24); border: 1px solid var(--border, #2e3440); border-radius: 20px; padding: 16px 20px; }
  .h2 { margin: 0 0 8px; font-size: 1.6rem; }
  .h3 { margin: 12px 0 6px; opacity: .9; }
  .identity { text-align: center; justify-content: center;}
  .hero { display:flex; gap: 24px; align-items:center; }
  .avatar { width: 200px; height: 200px; border-radius: 50%; border:1px solid var(--border); object-fit:cover; }
  .title { margin: 0; font-size: 1.8rem; }
  .muted { color: var(--sub, #a6afbd); margin: 0; }
  .actions { display:flex; gap: 10px; margin-top: 8px; justify-content: center; }
  .section { scroll-margin-top: 96px; }
  .summary { opacity: .9; line-height: 1.55; text-align: justify; }
  .logros { padding: 0px 5px 0px 5px; }
  .list-item { break-inside: avoid; margin: 6px 0; }
  .skill-group mat-chip { margin: 4px 6px 0 0; }
  .placeholder { color: var(--sub, #a6afbd); font-style: italic; }
  `]
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  about?: AboutProfile;

  readonly toc: TocItem[] = [
    { id: 'profile',      label: 'Perfil',         icon: 'person' },
    { id: 'experience',   label: 'Experiencia',    icon: 'work' },
    { id: 'education',    label: 'Educación',      icon: 'school' },
    { id: 'certs',        label: 'Complementaria', icon: 'badge' },
    { id: 'achievements', label: 'Logros',         icon: 'star' },
    { id: 'skills',       label: 'Skills',         icon: 'bolt' },
  ];

  activeSectionId?: string;
  private observer?: IntersectionObserver;

  @ViewChildren('section', { read: ElementRef }) sections!: QueryList<ElementRef<HTMLElement>>;

  constructor(private readonly aboutSvc: AboutService) {}

  async ngOnInit() {
    try {
      this.about = await firstValueFrom(this.aboutSvc.getAboutProfile());
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        console.error('Error cargando About:', e.status, e.url, e.error);
      } else {
        console.error('Error cargando About:', e);
      }
    }
  }

  ngAfterViewInit() {
    const opts: IntersectionObserverInit = { root: null, rootMargin: '0px 0px -60% 0px', threshold: 0.1 };
    this.observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible?.target && (visible.target as HTMLElement).id) {
        this.activeSectionId = (visible.target as HTMLElement).id;
      }
    }, opts);

    setTimeout(() => this.sections.forEach(ref => this.observer?.observe(ref.nativeElement)));
  }

  ngOnDestroy(): void { this.observer?.disconnect(); }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  openCV(url?: string) {
    if (url) window.open(url, '_blank');
    else window.open('/assets/LuisFelipeGarciaGomezCV.pdf', '_blank');
  }

  /* ===========================
     ADAPTADORES (MAPPERS) VISTA
     =========================== */

  /** Convierte achievements del API (string[] o {Description/description}) a string[] */
  achievementsText(): string[] {
    const a: any[] = (this.about as any)?.achievements
                  ?? (this.about as any)?.Achievements
                  ?? [];
    return a
      .map(x => typeof x === 'string' ? x : (x.description ?? x.Description ?? ''))
      .filter(Boolean);
  }

  /** Normaliza skills: [{ SkillType, Skills:[{SkillName}]}] -> { groupName, items:string[] } */
  normalizedSkills(): { groupName: string; items: string[] }[] {
    const raw: any[] = (this.about as any)?.skills
                    ?? (this.about as any)?.Skills
                    ?? [];
    return raw.map((g: any) => {
      const groupName =
        g.groupName ?? g.type ?? g.name ?? g.skillType ?? g.SkillType ?? 'Skills';

      const src =
        Array.isArray(g.items)  ? g.items  :
        Array.isArray(g.skills) ? g.skills :
        Array.isArray(g.Skills) ? g.Skills : [];

      const items = src
        .map((s: any) =>
          typeof s === 'string' ? s : (s.skillName ?? s.SkillName ?? String(s))
        )
        .filter(Boolean);

      return { groupName, items };
    }).filter(g => g.items.length);
  }

  /** Devuelve la lista mapeada a lo que espera <app-experience> */
  experienceVM(): ExpVM[] {
    const list: any[] = (this.about as any)?.experience
                     ?? (this.about as any)?.Experience
                     ?? [];
    return list.map((e: any): ExpVM => {
      const role     = e.role     ?? e.position ?? e.title     ?? '—';
      const company  = e.company  ?? e.org      ?? e.employer  ?? '—';
      const start    = e.start    ?? e.startDate ?? e.from     ?? e.rangeStart ?? '';
      const end      = e.end      ?? e.endDate   ?? e.to       ?? e.rangeEnd   ?? '';
      const range    = e.range    ?? this.asRange(start, end);

      const responsibilities =
        Array.isArray(e.responsibilities) ? e.responsibilities :
        typeof e.Responsibilities === 'string' ? this.splitToList(e.Responsibilities) :
        typeof e.responsibilities === 'string' ? this.splitToList(e.responsibilities) :
        [];

      return { role, company, range, responsibilities };
    });
  }

  /** Devuelve la lista mapeada a lo que espera <app-education> */
  educationVM(): EduVM[] {
    const list: any[] = (this.about as any)?.education
                     ?? (this.about as any)?.Education
                     ?? [];
    return list.map((ed: any): EduVM => {
      const institution = ed.institution ?? ed.school ?? ed.university ?? ed.Institution ?? '—';
      const degree      = ed.degree      ?? ed.title  ?? ed.program    ?? ed.Degree      ?? '—';
      const start       = ed.start       ?? ed.startDate ?? ed.from    ?? ed.rangeStart ?? ed.StartDate ?? '';
      const end         = ed.end         ?? ed.endDate   ?? ed.to      ?? ed.rangeEnd   ?? ed.EndDate   ?? '';
      const range       = ed.range ?? this.asRange(start, end);
      const notes       = Array.isArray(ed.notes) ? ed.notes
                        : ed.note ? [ed.note]
                        : ed.description ? [ed.description]
                        : ed.Description ? [ed.Description]
                        : [];
      return { institution, degree, range, notes };
    });
  }

  /** Mapea/ordena lo que espera <app-complementary-education> y FILTRA vacíos */
  complementaryVM(): Array<{ title: string; issuer: string; date: string; url?: string }> {
    const list: any[] = (this.about as any)?.complementaryEducation
                    ?? (this.about as any)?.ComplementaryEducation
                    ?? [];
    return list
      .map((c: any) => {
        const title  = (c.title  ?? c.name ?? c.course ?? c.cert ?? c.courseName ?? c.CourseName ?? '').toString().trim();
        const issuer = (c.issuer ?? c.school ?? c.provider ?? c.platform ?? c.institution ?? c.Institution ?? '').toString().trim();
        const date   = (c.date   ?? c.when  ?? c.issued  ?? c.completedAt ?? c.year ?? c.issueDate ?? c.IssueDate ?? '').toString().slice(0,10);
        const url    = (c.url    ?? c.link  ?? c.credentialUrl ?? c.CredentialUrl ?? c.certificateUrl ?? '').toString().trim();
        const order  = Number(c.orderIndex ?? c.OrderIndex ?? 0);
        return { title, issuer, date, url, order };
      })
      // ❗️Evitar tarjetas sin ningún dato visible:
      .filter(x => x.title || x.issuer || x.url)
      // Orden por OrderIndex (si viene):
      .sort((a, b) => (a.order - b.order))
      // el hijo no necesita 'order'
      .map(({ title, issuer, date, url }) => ({ title, issuer, date, url }));
  }

  /** Helpers */
  private asRange(start: string | Date, end: string | Date): string {
    const s = this.prettyDate(start);
    const e = this.prettyDate(end);
    return `${s || '—'} — ${e || 'Actual'}`;
  }

  private prettyDate(v: any): string {
    if (!v) return '';
    if (typeof v === 'string') return v; // ya viene formateado
    try {
      const d = new Date(v);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
    } catch { return ''; }
  }

  private splitToList(s: string): string[] {
    if (!s) return [];
    if (s.trim().startsWith('[')) {
      try {
        const arr = JSON.parse(s);
        return Array.isArray(arr) ? arr.map((x: any) => String(x).trim()).filter(Boolean) : [s];
      } catch { /* continua */ }
    }
    return s.split(/\r?\n|;|•|·|\||,/).map(x => x.trim()).filter(Boolean);
  }
}