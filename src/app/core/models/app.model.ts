export type PageKey = 'about' | 'resume' | 'portfolio' | 'projects' | 'contact';

export type LanguageCode = 'auto' | 'en' | 'hi' | 'es' | 'fr' | 'de';
export type SupportedLanguage = Exclude<LanguageCode, 'auto'>;

export interface ResumeSkill {
  key: string;
  value: number;
}

export interface PortfolioItem {
  title: string;
  image: string;
  category: string;
  tags?: string[];
  url?: string;
}

export interface KeyProjectItem {
  title: string;
  description: string;
  metrics?: string[];
  image: string;
  url?: string;
}

export interface SiteProfile {
  name: string;
  avatar: string;
  email: string;
  phone: string;
  experience: string;
  location: string;
  currentCompany: string;
  resumePdfUrl: string;
  resumeDocxUrl: string;
  coverLetterPdfUrl: string;
  coverLetterDocxUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  leetcodeUrl: string;
}

export interface SiteContactConfig {
  recipientEmail: string;
  mapEmbedUrl: string;
}

export interface SiteContent {
  profile: SiteProfile;
  resumeSkills: ResumeSkill[];
  portfolioItems: PortfolioItem[];
  keyProjects: KeyProjectItem[];
  contact: SiteContactConfig;
}
