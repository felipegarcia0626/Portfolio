import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="topbar">
      <a class="brand" routerLink="/about" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
        <span class="logo">LF</span>
        <span class="brand-text">Portfolio</span>
      </a>

      <nav class="links" id="primary-nav" [class.open]="menuOpen">
        <a routerLink="/about"    routerLinkActive="active" (click)="closeMenu()">About</a>
        <a routerLink="/projects" routerLinkActive="active" (click)="closeMenu()">Projects</a>
        <a routerLink="/contact"  routerLinkActive="active" (click)="closeMenu()">Contact</a>
      </nav>

      <button class="menu-btn" type="button" (click)="toggleMenu()" aria-label="Abrir menú" [attr.aria-expanded]="menuOpen" [attr.aria-controls]="'primary-nav'">
        <span class="bar"></span><span class="bar"></span><span class="bar"></span>
      </button>
    </header>

    <main class="shell">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host { display:block; }
    /* Topbar “glass” */
    .topbar{
      position: sticky; top: 0; z-index: 50;
      display: grid; grid-template-columns: 1fr auto auto; align-items: center;
      gap: 12px; padding: 10px 16px;
      background: color-mix(in oklab, var(--card, #0f141b) 80%, transparent);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--border, #2e3440);
    }

    /* Marca */
    .brand{
      display:flex; align-items:center; gap:10px; text-decoration:none;
      color: inherit; padding: 6px 8px; border-radius: 12px;
      transition: background .2s ease, transform .12s ease;
    }
    .brand:hover{ background: rgba(255,255,255,.04); transform: translateY(-1px); }
    .logo{
      width: 28px; height: 28px; border-radius: 8px;
      display:grid; place-items:center; font-weight: 800; letter-spacing:.5px;
      color:#fff; background: linear-gradient(135deg, #4f46e5, #06b6d4);
      box-shadow: 0 0 0 1px rgba(255,255,255,.08) inset;
    }
    .brand-text{ font-weight: 700; opacity:.95; }

    /* Links */
    .links{
      display:flex; align-items:center; gap:6px;
      padding: 4px; border: 1px solid var(--border, #2e3440);
      background: color-mix(in oklab, var(--card, #0f141b) 70%, transparent);
      border-radius: 14px;
    }
    .links a{
      position:relative;
      padding: 8px 12px; border-radius: 10px; text-decoration:none; color: inherit;
      transition: background .15s ease, color .15s ease;
    }
    .links a:hover{ background: rgba(255,255,255,.05); }
    .links a.active{
      color: #e2e8f0;
      background: rgba(99,102,241,.15);
      box-shadow: 0 0 0 1px rgba(99,102,241,.25) inset;
    }
    .links a.active::after{
      content:''; position:absolute; left:10px; right:10px; bottom:5px; height:2px;
      border-radius:2px; background: linear-gradient(90deg, #4f46e5, #06b6d4);
    }

    /* Botón hamburguesa */
    .menu-btn{
      display:none; cursor:pointer; border:1px solid var(--border, #2e3440);
      background: color-mix(in oklab, var(--card, #0f141b) 70%, transparent);
      border-radius: 10px; padding: 8px 10px;
    }
    .bar{ display:block; width:20px; height:2px; background:#cbd5e1; margin:3px 0; border-radius:2px; }

    /* Main shell */
    .shell{ padding: 14px 16px 24px; }

    /* Responsive */
    @media (max-width: 960px){
      .topbar{ grid-template-columns: auto auto 1fr; gap:8px; }
      .links{
        display:none;
        position: absolute; top: 56px; right:16px; z-index: 60;
        flex-direction: column; align-items: stretch; gap:4px;
        padding: 6px; width: min(260px, calc(100vw - 32px));
        box-shadow: 0 10px 30px rgba(0,0,0,.35);
      }
      .links.open{ display:flex; }
      .links a{ padding:10px 12px; }
      .menu-btn{ display:inline-block; margin-left:auto; }
    }
  `]
})
export class AppComponent {
  menuOpen = false;
  toggleMenu(){ this.menuOpen = !this.menuOpen; }
  closeMenu(){ this.menuOpen = false; }
}
