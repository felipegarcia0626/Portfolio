## Frontend

## Frontend

## ✅ Iteration 6 — Angular SPA with Standalone and Lazy Loading

### ✔️ Objective:
Implement the portfolio frontend as a professional SPA in Angular 17+, consuming backend services with best practices.

### ✔️ Included features:
- Standalone components: `AboutComponent`, `ProjectsComponent`, `ContactComponent`.
- Services: `AboutService`, `ProjectsService`, `ContactService`.
- Lazy loading implemented in `app.routes.ts` with `loadComponent`.
- Proxy configured for local development (`proxy.conf.json`).
- Navigation between routes.
- Clean interface based on real backend data.

### ✔️ Relevant structure:
```bash
frontend/
└── src/ 
    └── app/ 
        ├── about/ 
        │ └── about.component.ts/html/scss 
        ├── projects/ 
        │ └── projects.component.ts/html/scss 
        ├── contact/ 
        │ └── contact.component.ts/html/scss 
        ├── services/ 
        │ ├── about.service.ts 
        │ ├── projects.service.ts 
        │ └── contact.service.ts 
        ├── app.routes.ts 
        ├── app.component.ts/html/scss 
        └── main.ts

## ✅ Iteración 6 — SPA Angular con Standalone y Lazy Loading

### ✔️ Objetivo:
Implementar el frontend del portafolio como una SPA profesional en Angular 17+, que consuma los servicios del backend con buenas prácticas.

### ✔️ Funcionalidades incluidas:
- Componentes Standalone: `AboutComponent`, `ProjectsComponent`, `ContactComponent`.
- Servicios: `AboutService`, `ProjectsService`, `ContactService`.
- Lazy loading implementado en `app.routes.ts` con `loadComponent`.
- Proxy configurado para desarrollo local (`proxy.conf.json`).
- Navegación entre rutas.
- Interfaz limpia basada en datos reales del backend.

### ✔️ Estructura relevante:
```bash
frontend/
└── src/
    └── app/
        ├── about/
        │   └── about.component.ts/html/scss
        ├── projects/
        │   └── projects.component.ts/html/scss
        ├── contact/
        │   └── contact.component.ts/html/scss
        ├── services/
        │   ├── about.service.ts
        │   ├── projects.service.ts
        │   └── contact.service.ts
        ├── app.routes.ts
        ├── app.component.ts/html/scss
        └── main.ts
