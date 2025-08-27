// backend/src/controllers/aboutController.ts
import { Request, Response } from 'express';
import { connectDB } from '../config/db';
import sql from 'mssql';

function safeJson<T>(v: unknown, fallback: T): T {
  if (v == null) return fallback;
  if (Array.isArray(v) || typeof v === 'object') return v as T;
  if (typeof v === 'string') {
    try { return JSON.parse(v) as T; } catch { return fallback; }
  }
  return fallback;
}
function listify(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(x => String(x).trim()).filter(Boolean);
  if (typeof v === 'string') {
    const s = v.trim();
    if (!s) return [];
    // si parece JSON de array, intenta parsearlo
    if (s.startsWith('[') && s.endsWith(']')) {
      const arr = safeJson<any[]>(s, []);
      return Array.isArray(arr) ? arr.map(x => String(x).trim()).filter(Boolean) : [s];
    }
    // separadores comunes
    return s.split(/\r?\n|;|•|·|\||,/).map(x => x.trim()).filter(Boolean);
  }
  return [];
}

export const getAboutProfile = async (req: Request, res: Response) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().execute('spGetAboutProfile');

    const rawRecordsets: unknown = (result as any).recordsets;
    const sets: sql.IRecordSet<any>[] = Array.isArray(rawRecordsets) ? rawRecordsets as sql.IRecordSet<any>[] : [];
    const set = (i: number): any[] => (i >= 0 && i < sets.length && Array.isArray(sets[i])) ? sets[i] as any[] : [];

    // Caso A: un solo recordset con columnas JSON
    const oneSet = set(0);
    const row = oneSet[0];

    const hasJsonColumns =
      row && (
        row.ContactInfo != null || row.contactInfo != null ||
        row.Skills != null || row.skills != null ||
        row.Achievements != null || row.achievements != null ||
        row.Experience != null || row.experience != null ||
        row.Education != null || row.education != null ||
        row.ComplementaryEducation != null || row.complementaryEducation != null
      );

    let contactInfo: any[] = [];
    let skills: any[] = [];
    let achievements: any[] = [];
    let experience: any[] = [];
    let education: any[] = [];
    let complementaryEducation: any[] = [];

    if (hasJsonColumns) {
      // ✅ Leer desde columnas JSON
      contactInfo = safeJson<any[]>(row.ContactInfo ?? row.contactInfo, []).map(c => ({
        infoLabel:  c.InfoLabel  ?? c.infoLabel  ?? '',
        infoValue:  c.InfoValue  ?? c.infoValue  ?? '',
        icon:       c.Icon       ?? c.icon       ?? '',
        orderIndex: c.OrderIndex ?? c.orderIndex ?? 0,
      })).sort((a, b) => a.orderIndex - b.orderIndex);

      skills = safeJson<any[]>(row.Skills ?? row.skills, []).map((grp) => {
        const inner = safeJson<any[]>(grp.Skills ?? grp.skills, []);
        return {
          skillType: grp.SkillType ?? grp.skillType ?? '',
          skills: inner.map(s => ({
            skillName:  s.SkillName ?? s.skillName ?? String(s),
            orderIndex: s.OrderIndex ?? s.orderIndex ?? 0,
          })).sort((a, b) => a.orderIndex - b.orderIndex),
        };
      });

      achievements = safeJson<any[]>(row.Achievements ?? row.achievements, []).map(a => ({
        description: a.Description ?? a.description ?? String(a),
        orderIndex:  a.OrderIndex  ?? a.orderIndex  ?? 0,
      })).sort((a, b) => a.orderIndex - b.orderIndex);

      experience = safeJson<any[]>(row.Experience ?? row.experience, []).map(e => ({
        position:        e.Position ?? e.position ?? '',
        company:         e.Company  ?? e.company  ?? '',
        startDate:       e.StartDate ?? e.startDate ?? '',
        endDate:         e.EndDate   ?? e.endDate   ?? null,
        responsibilities: listify(e.Responsibilities ?? e.responsibilities), // ← normaliza
        achievements:     listify(e.Achievements     ?? e.achievements),     // ← normaliza
        orderIndex:       e.OrderIndex ?? e.orderIndex ?? 0,
      })).sort((a, b) => a.orderIndex - b.orderIndex);

      education = safeJson<any[]>(row.Education ?? row.education, []).map(ed => ({
        institution: ed.Institution ?? ed.institution ?? '',
        degree:      ed.Degree      ?? ed.degree      ?? '',
        startDate:   ed.StartDate   ?? ed.startDate   ?? '',
        endDate:     ed.EndDate     ?? ed.endDate     ?? '',
        description: ed.Description ?? ed.description ?? '',
        orderIndex:  ed.OrderIndex  ?? ed.orderIndex  ?? 0,
      })).sort((a, b) => a.orderIndex - b.orderIndex);

      complementaryEducation = safeJson<any[]>(row.ComplementaryEducation ?? row.complementaryEducation, []).map(c => ({
        courseName:    c.CourseName    ?? c.courseName    ?? '',
        institution:   c.Institution   ?? c.institution   ?? '',
        issueDate:     c.IssueDate     ?? c.issueDate     ?? '',
        credentialUrl: c.CredentialUrl ?? c.credentialUrl ?? '',
        orderIndex:    c.OrderIndex    ?? c.orderIndex    ?? 0,
      })).sort((a, b) => a.orderIndex - b.orderIndex);

    } else {
      // Caso B: múltiples recordsets (fallback al formato anterior)
      const aboutRows  = set(0);
      const contactRaw = set(1);
      const skillsRaw  = set(2);
      const achRaw     = set(3);
      const expRaw     = set(4);
      const eduRaw     = set(5);
      const compRaw    = set(6);

      if (!aboutRows.length) {
        return res.status(404).json({ message: 'No se encontró tbAbout. SP sin datos.' });
      }

      contactInfo = contactRaw.map(c => ({
        infoLabel:  c.InfoLabel  ?? c.infoLabel  ?? '',
        infoValue:  c.InfoValue  ?? c.infoValue  ?? '',
        icon:       c.Icon       ?? c.icon       ?? '',
        orderIndex: c.OrderIndex ?? c.orderIndex ?? 0,
      })).sort((a, b) => a.orderIndex - b.orderIndex);

      skills = skillsRaw.map((grp) => {
        const inner = safeJson<any[]>(grp.Skills ?? grp.skills, []);
        return {
          skillType: grp.SkillType ?? grp.skillType ?? '',
          skills: inner.map(s => ({
            skillName:  s.SkillName ?? s.skillName ?? String(s),
            orderIndex: s.OrderIndex ?? s.orderIndex ?? 0,
          })).sort((a, b) => a.orderIndex - b.orderIndex),
        };
      });

      achievements = achRaw.map(a => ({
        description: a.Description ?? a.description ?? '',
        orderIndex:  a.OrderIndex  ?? a.orderIndex  ?? 0,
      })).sort((a, b) => a.orderIndex - b.orderIndex);

      experience = expRaw.map(e => ({
        position:        e.Position ?? e.position ?? '',
        company:         e.Company  ?? e.company  ?? '',
        startDate:       e.StartDate ?? e.startDate ?? '',
        endDate:         e.EndDate   ?? e.endDate   ?? null,
        responsibilities: listify(e.Responsibilities ?? e.responsibilities),
        achievements:     listify(e.Achievements     ?? e.achievements),
        orderIndex:       e.OrderIndex ?? e.orderIndex ?? 0,
      })).sort((a, b) => a.orderIndex - b.orderIndex);

      education = eduRaw.map(ed => ({
        institution: ed.Institution ?? ed.institution ?? '',
        degree:      ed.Degree      ?? ed.degree      ?? '',
        startDate:   ed.StartDate   ?? ed.startDate   ?? '',
        endDate:     ed.EndDate     ?? ed.endDate     ?? '',
        description: ed.Description ?? ed.description ?? '',
        orderIndex:  ed.OrderIndex  ?? ed.orderIndex  ?? 0,
      })).sort((a, b) => a.orderIndex - b.orderIndex);

      complementaryEducation = compRaw.map(c => ({
        courseName:    c.CourseName    ?? c.courseName    ?? '',
        institution:   c.Institution   ?? c.institution   ?? '',
        issueDate:     c.IssueDate     ?? c.issueDate     ?? '',
        credentialUrl: c.CredentialUrl ?? c.credentialUrl ?? '',
        orderIndex:    c.OrderIndex    ?? c.orderIndex    ?? 0,
      })).sort((a, b) => a.orderIndex - b.orderIndex);
    }

    // Cabecera (vale para ambos casos)
    const portfolioName = row?.PortfolioName ?? row?.portfolioName ?? '';
    const city = row?.City ?? row?.city ?? '';
    const profileDescription = row?.ProfileDescription ?? row?.profileDescription ?? '';
    const cvUrl = row?.CvUrl ?? row?.cvUrl ?? '';
    const avatarUrl = row?.AvatarUrl ?? row?.avatarUrl ?? '';

    return res.json({
      portfolioName, city, profileDescription, cvUrl, avatarUrl,
      contactInfo, skills, achievements, experience, education, complementaryEducation,
    });
  } catch (err: any) {
    console.error('❌ Error en getAboutProfile:', err?.message || err);
    return res.status(500).json({ message: 'Error del servidor en /api/about', detail: err?.message || String(err) });
  }
};
