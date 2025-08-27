import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactService, ContactInfo, ContactMessage } from '../services/contact.service';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  template: `
  <div class="contact-layout">
    <!-- Hero -->
    <mat-card class="glass hero">
      <div class="hero-icon">
        <mat-icon>mail</mat-icon>
      </div>
      <div class="hero-copy">
        <h1 class="title">Hablemos</h1>
        <p class="muted">¿Tienes un proyecto, una idea o una vacante? Envíame un mensaje o usa cualquiera de mis canales de contacto.</p>
      </div>
    </mat-card>

    <!-- Grid: Info + Form -->
    <div class="grid">
      <!-- Contact info -->
      <mat-card class="glass info">
        <h2 class="h2">Conecta conmigo</h2>

        @if (loading) {
          <div class="skeleton-list">
            <div class="sk-row"></div>
            <div class="sk-row"></div>
            <div class="sk-row"></div>
          </div>
        } @else if (error) {
          <div class="state error">
            <mat-icon>error_outline</mat-icon>
            No fue posible cargar la información de contacto.
          </div>
        } @else if (contactInfo.length) {
          <ul class="links">
            @for (c of contactInfoSorted({ excludePhones: true }); track c.orderIndex) {
              <li>
                <a [href]="hrefFor(c)" target="_blank" rel="noopener">
                  <mat-icon class="li-icon">{{ iconFor(c) }}</mat-icon>
                  <span class="label">{{ c.infoLabel }}</span>
                  <span class="value">{{ c.infoValue }}</span>
                </a>
              </li>
            }
          </ul>
        } @else {
          <div class="state muted">Sin información de contacto por ahora.</div>
        }
      </mat-card>

      <!-- Formulario -->
      <mat-card class="glass form">
        <h2 class="h2">Envíame un mensaje</h2>

        @if (success === true) {
          <div class="state ok">
            <mat-icon>check_circle</mat-icon>
            ¡Gracias! Tu mensaje fue enviado.
          </div>
        } @else if (success === false) {
          <div class="state error">
            <mat-icon>error_outline</mat-icon>
            Ocurrió un error al enviar. Intenta nuevamente.
          </div>
        }

        <form (ngSubmit)="onSubmit()" novalidate>
          <div class="row">
            <mat-form-field appearance="outline" class="field">
              <mat-label>Nombre</mat-label>
              <input matInput [(ngModel)]="contactName" name="name" required minlength="2" />
            </mat-form-field>

            <mat-form-field appearance="outline" class="field">
              <mat-label>Email</mat-label>
              <input matInput [(ngModel)]="contactEmail" name="email" required [pattern]="emailPattern" />
            </mat-form-field>
          </div>

          <mat-form-field appearance="outline" class="field">
            <mat-label>Mensaje</mat-label>
            <textarea matInput rows="6" [(ngModel)]="contactMessage" name="message" required minlength="10"></textarea>
          </mat-form-field>

          <div class="actions">
            <button mat-raised-button color="primary"
              type="submit"
              [disabled]="sending || formInvalid()">
              @if (sending) {
                <mat-spinner diameter="18"></mat-spinner>
              } @else {
                <mat-icon>send</mat-icon>
              }
              <span>{{ sending ? 'Enviando…' : 'Enviar' }}</span>
            </button>
            <button mat-stroked-button type="button" (click)="reset()" [disabled]="sending">
              <mat-icon>restart_alt</mat-icon>
              Limpiar
            </button>
          </div>
        </form>
      </mat-card>
    </div>
  </div>
  `,
  styles: [`
  :host { display:block; }
  .glass { background: var(--card, #181c24); border:1px solid var(--border, #2e3440); border-radius: 20px; }

  .contact-layout { display:grid; gap: 18px; }
  .hero { display:flex; gap:16px; padding:16px 18px; align-items:center; }
  .hero-icon {
    width:48px; height:48px; border-radius:12px; display:grid; place-items:center;
    background: linear-gradient(135deg, #4f46e5, #06b6d4);
    color: #fff; box-shadow: 0 0 0 1px rgba(255,255,255,.08) inset;
  }
  .title { margin:0; font-size:1.6rem; text-align:center; }
  .muted { color: var(--sub, #a6afbd); margin:0; }

  .grid { display:grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  @media (max-width: 1024px){ .grid { grid-template-columns: 1fr; } }

  .info, .form { padding: 16px; }
  .h2 { margin:0 0 8px; font-size:1.25rem; }

  /* Contact links */
  .links { list-style:none; margin:8px 0 0; padding:0; display:grid; gap:8px; }
  .links li a {
    display:grid; grid-template-columns: 28px 120px 1fr; align-items:center; gap:10px;
    padding:10px 12px; border:1px solid var(--border, #2e3440); border-radius:12px; text-decoration:none; color:inherit;
    background: color-mix(in oklab, var(--card, #0f141b) 70%, transparent);
    transition: transform .12s ease, background .15s ease;
  }
  .links li a:hover { transform: translateY(-1px); background: rgba(255,255,255,.04); }
  .li-icon { opacity:.9; }
  .label { opacity:.9; }
  .value { opacity:.85; word-break: break-word; }

  /* Form */
  .row { display:grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  @media (max-width: 760px){ .row { grid-template-columns: 1fr; } }
  .field { width:100%; }
  .actions { display:flex; gap:10px; margin-top: 8px; align-items:center; }
  .actions button { display:inline-flex; align-items:center; gap:8px; }

  /* States */
  .state { display:flex; align-items:center; gap:8px; padding:10px 12px; border-radius: 12px; margin: 6px 0 10px; }
  .state.ok    { border:1px solid rgba(34,197,94,.3);  background: rgba(34,197,94,.08);  color:#def7e5; }
  .state.error { border:1px solid rgba(239,68,68,.35); background: rgba(239,68,68,.08); color:#ffd9d9; }
  .skeleton-list { display:grid; gap:8px; margin-top:6px; }
  .sk-row { height:40px; border-radius:12px; background: linear-gradient(90deg, rgba(255,255,255,.06), rgba(255,255,255,.12), rgba(255,255,255,.06)); background-size: 200% 100%; animation: shimmer 1.2s infinite; }
  @keyframes shimmer { 0%{ background-position: 0% 0;} 100%{ background-position: -200% 0;} }
  `]
})
export class ContactComponent implements OnInit {
  contactInfo: ContactInfo[] = [];

  contactName = '';
  contactEmail = '';
  contactMessage = '';

  sending = false;
  success: boolean | null = null;
  loading = true;
  error = false;

  readonly emailPattern = '^[\\w\\.-]+@[\\w\\.-]+\\.[A-Za-z]{2,}$';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.getContactInfo().subscribe({
      next: (data) => { this.contactInfo = data ?? []; this.loading = false; },
      error: () => { this.error = true; this.loading = false; }
    });
  }

  onSubmit(): void {
    if (this.formInvalid()) return;
    const msg: ContactMessage = {
      contactName: this.contactName.trim(),
      contactEmail: this.contactEmail.trim(),
      contactMessage: this.contactMessage.trim(),
    };
    this.sending = true;
    this.success = null;

    this.contactService.sendMessage(msg).subscribe({
      next: () => {
        this.sending = false; this.success = true;
        this.contactName = ''; this.contactEmail = ''; this.contactMessage = '';
      },
      error: () => {
        this.sending = false; this.success = false;
      }
    });
  }

  reset(): void {
    this.contactName = '';
    this.contactEmail = '';
    this.contactMessage = '';
    this.success = null;
  }

  formInvalid(): boolean {
    const nameOk  = this.contactName.trim().length >= 2;
    const emailOk = new RegExp(this.emailPattern).test(this.contactEmail.trim());
    const msgOk   = this.contactMessage.trim().length >= 10;
    return !(nameOk && emailOk && msgOk) || this.sending;
  }

  // --- CONTACT INFO HELPERS ---

  contactInfoSorted(opts?: { excludePhones?: boolean })
  : Array<{ infoLabel: string; infoValue: string; icon?: string; orderIndex: number }> {
    const list = (this.contactInfo ?? []).map((c: any) => ({
      infoLabel: (c.infoLabel ?? c.InfoLabel ?? '').toString(),
      infoValue: (c.infoValue ?? c.InfoValue ?? '').toString(),
      icon:      (c.icon      ?? c.Icon      ?? '').toString(),
      orderIndex: Number(c.orderIndex ?? c.OrderIndex ?? 0),
    }));
    const sorted = list.sort((a, b) => a.orderIndex - b.orderIndex);
    if (opts?.excludePhones) {
      return sorted.filter(c => !/phone|tel/i.test(c.infoLabel));
    }
    return sorted;
  }


  iconFor(c: { infoLabel: string; icon?: string }): string {
    const label = (c.infoLabel || '').toLowerCase();
    const icon  = (c.icon || '').toLowerCase();
    if (icon) return icon;
    if (label.includes('email')) return 'mail';
    if (label.includes('phone') || label.includes('tel')) return 'phone';
    if (label.includes('linkedin')) return 'linkedin';
    if (label.includes('github')) return 'code';
    if (label.includes('web') || label.includes('site')) return 'language';
    return 'link';
  }

  hrefFor(c: { infoLabel: string; infoValue: string }): string {
    const label = (c.infoLabel || '').toLowerCase();
    const value = c.infoValue || '';
    if (label.includes('email')) return `mailto:${value}`;
    if (label.includes('phone') || label.includes('tel')) return `tel:${value.replace(/\s+/g,'')}`;
    return value; // asumir URL
  }
}
