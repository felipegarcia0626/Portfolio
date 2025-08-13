import { Request, Response } from 'express';
import { connectDB } from '../config/db';

/**
    getAbout
    Controlador que ejecuta el procedimiento almacenado spGetAbout y devuelve la información de la tabla tbAbout.
 */

// Parse seguro: si es string intenta parsear, si ya es objeto lo deja, si no hay nada devuelve fallback
function safeJson<T>(value: unknown, fallback: T): T {
  if (value == null) return fallback;
  if (typeof value === 'string') {
    try { return JSON.parse(value) as T; } catch { return fallback; }
  }
  // Si ya es objeto/array, úsalo tal cual
  return value as T;
}

export const getAboutProfile = async (req: Request, res: Response) => {
  try {
    // Conectamos a la base de datos usando la función centralizada connectDB
    const pool = await connectDB();

    // Ejecutamos el procedimiento almacenado
    const result = await pool.request().execute('spGetAboutProfile');
    
    // Verificamos si se obtuvo algún resultado
    if (!result.recordset[0]) return res.status(404).json({ message: 'Perfil no encontrado' });
    const row = result.recordset[0];

    // 1) Parsear (o pasar tal cual) los bloques JSON/objetos
    const contactRaw = safeJson<any[]>(row.ContactInfo, []);
    const skillsRaw  = safeJson<any[]>(row.Skills, []);
    const achRaw     = safeJson<any[]>(row.Achievements, []);
    const expRaw     = safeJson<any[]>(row.Experience, []);
    const eduRaw     = safeJson<any[]>(row.Education, []);
    const compRaw    = safeJson<any[]>(row.ComplementaryEducation, []);

    // 2) Mapear a camelCase

    // Contacto
    const contactInfo = contactRaw.map((c: any) => ({
      infoLabel:  c.InfoLabel ?? c.infoLabel,
      infoValue:  c.InfoValue ?? c.infoValue,
      icon:       c.Icon ?? c.icon,
      orderIndex: c.OrderIndex ?? c.orderIndex,
    }));

    // Skills (ojo: cada grupo trae su propio "Skills" anidado, que a veces es string y a veces objeto)
    const skills = skillsRaw.map((grp: any) => {
      const innerArray = safeJson<any[]>(grp.Skills ?? grp.skills, []);
      return {
        skillType: grp.SkillType ?? grp.skillType,
        skills: innerArray.map((s: any) => ({
          skillName:  s.SkillName ?? s.skillName,
          orderIndex: s.OrderIndex ?? s.orderIndex,
        })),
      };
    });

    // Logros
    const achievements = achRaw.map((a: any) => ({
      description: a.Description ?? a.description,
      orderIndex:  a.OrderIndex ?? a.orderIndex,
    }));

    // Experiencia
    const experience = expRaw.map((e: any) => ({
      position:         e.Position ?? e.position,
      company:          e.Company ?? e.company,
      startDate:        e.StartDate ?? e.startDate,
      endDate:          e.EndDate ?? e.endDate,
      responsibilities: e.Responsibilities ?? e.responsibilities,
      achievements:     e.Achievements ?? e.achievements,
      orderIndex:       e.OrderIndex ?? e.orderIndex,
    }));

    // Educación formal
    const education = eduRaw.map((ed: any) => ({
      institution: ed.Institution ?? ed.institution,
      degree:      ed.Degree ?? ed.degree,
      startDate:   ed.StartDate ?? ed.startDate,
      endDate:     ed.EndDate ?? ed.endDate,
      description: ed.Description ?? ed.description,
      orderIndex:  ed.OrderIndex ?? ed.orderIndex,
    }));

    // Educación complementaria
    const complementaryEducation = compRaw.map((c: any) => ({
      courseName:    c.CourseName ?? c.courseName,
      institution:   c.Institution ?? c.institution,
      issueDate:     c.IssueDate ?? c.issueDate,
      credentialUrl: c.CredentialUrl ?? c.credentialUrl,
      orderIndex:    c.OrderIndex ?? c.orderIndex,
    }));

    // 3) Responder en camelCase para el frontend
    res.json({
      portfolioName:      row.PortfolioName,
      city:               row.City,
      profileDescription: row.ProfileDescription,
      cvUrl:              row.CvUrl,
      avatarUrl:          row.AvatarUrl,
      contactInfo,
      skills,
      achievements,
      experience,
      education,
      complementaryEducation,
    });

  } catch (err) {
    console.error('Error en getAboutProfile:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};