import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define el tipo de dato esperado desde /api/projects
export interface Project {
  ProjectName: string;
  Description: string;
  Technologies: string;
  GitHubURL: string;
  LiveDemoURL: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('/api/projects');
  }
}
