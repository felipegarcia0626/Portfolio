/* Acepta string[] o array de objetos { title, issuer, date, url } */
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

type CertString = string;
type CertItem = { title?: string; issuer?: string; date?: string; url?: string };

@Component({
  selector: 'app-complementary-education',
  standalone: true,
  imports: [MatCardModule],
  template: `
  @if (normalized.length) {
    <div class="grid">
      @for (c of normalized; track c.title) {
        <mat-card class="item">
          @if (c.title)   { <div class="title">{{ c.title }}</div> }
          <div class="meta">
            @if (c.issuer) { <span class="issuer">{{ c.issuer }}</span> }
            <span class="spacer"></span>
            @if (c.date)   { <span class="date">{{ c.date }}</span> }
          </div>
          @if (c.url) {
            <a class="url" [href]="c.url" target="_blank" rel="noopener">Credencial</a>
          }
        </mat-card>
      }
    </div>
  } @else {
    <div class="placeholder">Sin certificaciones para mostrar.</div>
  }
  `,
  styles: [`
  .grid { display:grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
  .item { background: var(--surface, #181c24); border: 1px solid var(--border, #2e3440); border-radius: 12px; padding: 12px 14px; }
  .title { font-weight: 700; line-height: 1.3; }
  .meta { display:flex; align-items:center; margin-top: 4px; opacity:.9; }
  .issuer { font-style: italic; }
  .spacer { flex: 1 1 auto; }
  .date { white-space: nowrap; }
  .url { margin-top: 6px; display:inline-block; }
  .placeholder { color: var(--sub, #a6afbd); font-style: italic; }
  `]
})
export class ComplementaryEducationComponent {
  @Input() items: Array<CertString | CertItem> = [];

  /** Normaliza y FILTRA vacíos para no renderizar tarjetas-línea */
  get normalized(): CertItem[] {
    return (this.items ?? [])
      .map((x: any) => {
        if (typeof x === 'string') {
          const t = x.trim();
          return t ? { title: t } : {};
        }
        const title  = (x.title ?? x.name ?? x.course ?? x.CourseName ?? '').toString().trim();
        const issuer = (x.issuer ?? x.school ?? x.provider ?? x.platform ?? x.institution ?? x.Institution ?? '').toString().trim();
        const date   = (x.date ?? x.when ?? x.issued ?? x.completedAt ?? x.year ?? x.issueDate ?? x.IssueDate ?? '').toString().slice(0,10);
        const url    = (x.url ?? x.link ?? x.credentialUrl ?? x.CredentialUrl ?? x.certificateUrl ?? '').toString().trim();
        return { title, issuer, date, url };
      })
      .filter(i => (i.title?.length || i.issuer?.length || i.url?.length));
  }
}
