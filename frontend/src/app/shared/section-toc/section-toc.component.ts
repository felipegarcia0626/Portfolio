/* 
   Índice lateral plegable (TOC) con sección activa y modo flotante opcional.
*/
import { Component, EventEmitter, Input, Output, computed, signal, HostBinding } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule }    from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

export type TocItem = { id: string; label: string; icon?: string };

@Component({
  selector: 'app-section-toc',
  standalone: true,
  imports: [NgClass, MatButtonModule, MatIconModule, MatTooltipModule],
  template: `
  <nav class="toc" [class.collapsed]="collapsed()">
    <div class="toc__header">
      <button mat-icon-button (click)="toggle()" [matTooltip]="collapsed() ? 'Expandir' : 'Contraer'">
        <mat-icon>{{ collapsed() ? 'chevron_right' : 'chevron_left' }}</mat-icon>
      </button>

      @if (!collapsed()) {
        <span class="toc__title">Secciones</span>
      }
    </div>

    <ul class="toc__list">
      @for (s of sections; track s.id) {
        <li class="toc__item" [class.active]="s.id === activeId">
          <button mat-button class="toc__btn" (click)="onNav(s.id)"
                  [matTooltip]="collapsed() ? s.label : ''" matTooltipPosition="right">
            <mat-icon class="toc__icon">{{ s.icon || 'radio_button_unchecked' }}</mat-icon>
            @if (!collapsed()) { <span class="toc__label">{{ s.label }}</span> }
          </button>
        </li>
      }
    </ul>
  </nav>
  `,
  styles: [`
  :host { display:block; }

  /* Variables CSS para afinar offsets sin tocar el TS */
  :host {
    --toc-top: 96px;         /* margen superior en desktop */
    --toc-left: 0px;         /* puedes moverlo si lo fijas */
    --toc-z: 40;             /* z-index encima de cards */
    --toc-maxh: calc(100vh - var(--toc-top) - 16px); /* altura máx en fixed */
  }

  /* ────────────── MODO STICKY (por defecto) ──────────────
     Se mantiene visible mientras se hace scroll, pero en su columna.
  */
  :host(:not(.floating)) .toc {
    position: sticky; top: var(--toc-top);
  }

  /* ────────────── MODO FIXED (flotante real) ──────────────
     Queda fijo sobre la página. El contenedor host sigue ocupando espacio
     en la grilla, así evitas reflows/solapamientos bruscos.
  */
  :host.floating { position: relative; } /* host mantiene la columna */
  :host.floating .toc {
    position: fixed;
    top: var(--toc-top);
    left: var(--toc-left);
    z-index: var(--toc-z);
    /* hace el nav “panel” con scroll interno si crece mucho */
    max-height: var(--toc-maxh);
    overflow: auto;
  }

  /* Estilos comunes del TOC */
  .toc {
    display: grid; gap: 12px;
    background: var(--card, #181c24);
    border: 1px solid var(--border, #2e3440);
    border-radius: 16px; padding: 10px;
    width: 240px; transition: width .2s ease;
  }

  .toc.collapsed { width: 64px; padding: 10px 8px; }
  .toc__header { display:flex; align-items:center; gap: 8px; }
  .toc__title { font-weight: 600; opacity: .9; }
  .toc__list { list-style:none; padding:0; margin:0; display:grid; gap: 4px; }
  .toc__btn { width:100%; justify-content:flex-start; text-transform:none; gap: 10px; }
  .toc__icon { opacity:.85; }
  .toc__item.active .toc__btn { background: rgba(129,140,248,.12); }
  .toc__label { white-space: nowrap; overflow:hidden; text-overflow:ellipsis; }

  /* Mobile: barra superior horizontal (en mobile es mejor no fijar) */
  @media (max-width: 1024px) {
    :host.floating .toc,
    :host:not(.floating) .toc {
      position: static;
      width: 100%; display: flex; flex-direction: row;
      align-items: center; padding: 8px; overflow-x: auto; max-height: none;
    }
    .toc.collapsed { width: 100%; }
    .toc__header { flex: 0 0 auto; margin-right: 8px; }
    .toc__list { display:flex; gap: 6px; }
    .toc__btn { min-width: max-content; }
  }
  `]
})
export class SectionTocComponent {
  @Input() sections: TocItem[] = [];
  @Input() activeId?: string;

  /* ← NUEVO: activa modo flotante (fixed) desde el padre:
       <app-section-toc [sections]="toc" [activeId]="activeSectionId" [floating]="true">
     En mobile (<=1024px) se ignora y se vuelve barra horizontal.
  */
  @Input() floating = false;

  /* HostBinding: añade/quita clase .floating al :host para alternar reglas CSS */
  @HostBinding('class.floating') get isFloating() { return this.floating; }

  @Output() goto = new EventEmitter<string>();

  private _collapsed = signal(false);
  collapsed = computed(() => this._collapsed());

  toggle() { this._collapsed.set(!this._collapsed()); }
  onNav(id: string) { this.goto.emit(id); }
}
