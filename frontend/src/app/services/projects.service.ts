import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define el tipo de dato esperado desde /api/projects
export interface Project {
  id: number;
  projectName: string;
  projectDescription?: string;
  technologies?: string;
  gitHubUrl?: string;
  demoUrl?: string;
  orderIndex: number;
  createDate: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  constructor(private http: HttpClient) {}
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('/api/projects');
  }
}
