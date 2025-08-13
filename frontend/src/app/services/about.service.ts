import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


// Interface que representa la estructura del objeto devuelto por el backend
export interface ContactInfo { infoLabel: string; infoValue: string; icon: string; orderIndex: number; }
export interface SkillGroup { skillType: string; skills: { skillName: string; orderIndex: number }[]; }
export interface Achievement { description: string; orderIndex: number; }
export interface ExperienceItem {
  position: string; company: string; startDate: string; endDate?: string | null;
  responsibilities?: string; achievements?: string; orderIndex: number;
}
export interface EducationItem {
  institution: string; degree: string; startDate: string; endDate: string;
  description?: string; orderIndex: number;
}
export interface ComplementaryEducationItem {
  courseName: string; institution: string; issueDate: string;
  credentialUrl?: string; description?: string; orderIndex: number;
}

export interface AboutProfile {
  portfolioName: string;
  city: string;
  profileDescription: string;
  cvUrl: string;
  avatarUrl: string;
  contactInfo: ContactInfo[];
  skills: SkillGroup[];
  achievements: Achievement[];
  experience: ExperienceItem[];
  education: EducationItem[];
  complementaryEducation: ComplementaryEducationItem[];
}

@Injectable({ providedIn: 'root' })
export class AboutService {
  constructor(private http: HttpClient) {}
  // Llama al endpoint /api/about y retorna un observable con los datos
  getAboutProfile(): Observable<AboutProfile> {
    return this.http.get<AboutProfile>('/api/about');
  }
}

