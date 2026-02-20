import { Injectable, signal } from '@angular/core';
import { SiteContent } from '../models/app.model';

@Injectable({ providedIn: 'root' })
export class SiteContentService {
  private readonly key = 'site_content';

  private readonly defaults: SiteContent = {
    profile: {
      name: 'Pankaj Gupta',
      avatar: 'assets/images/pankaj-avatar.png',
      email: 'pankajgupta403104@gmail.com',
      phone: '+91 8929402435',
      experience: '4+ Years',
      location: 'Bengaluru, India (Open to Relocation)',
      currentCompany: 'Tata Consultancy Services (TCS)',
      resumePdfUrl: 'assets/documents/resume-cover_letter/Pankaj_Gupta_Senior_Angular_Frontend_Developer_CV.pdf',
      resumeDocxUrl: 'assets/documents/resume-cover_letter/Pankaj_Gupta_Senior_Angular_Frontend_Developer_CV.docx',
      coverLetterPdfUrl: 'assets/documents/resume-cover_letter/Pankaj_Gupta_Senior_Angular_Frontend_Developer_Cover_letter.pdf',
      coverLetterDocxUrl: 'assets/documents/resume-cover_letter/Pankaj_Gupta_Senior_Angular_Frontend_Developer_Cover_letter.docx',
      githubUrl: 'https://github.com/PankajGupta70',
      linkedinUrl: 'https://linkedin.com/in/pankaj-gupta-software-developer',
      leetcodeUrl: 'https://leetcode.com/'
    },
    resumeSkills: [
      { key: 'skill_1', value: 95 },
      { key: 'skill_2', value: 92 },
      { key: 'skill_3', value: 90 },
      { key: 'skill_4', value: 88 }
    ],
    portfolioItems: [
      { title: 'Finance', image: 'assets/images/project-1.jpg', category: 'web development', tags: ['Angular', 'NgRx', 'REST API'] },
      { title: 'Orizon', image: 'assets/images/project-2.png', category: 'web development', tags: ['TypeScript', 'SCSS', 'RxJS'] },
      { title: 'Fundo', image: 'assets/images/project-3.jpg', category: 'web design', tags: ['UI/UX', 'Figma', 'Responsive'] },
      { title: 'Brawlhalla', image: 'assets/images/project-4.png', category: 'applications', tags: ['Angular', 'PWA', 'i18n'] },
      { title: 'DSM.', image: 'assets/images/project-5.png', category: 'web design', tags: ['Design System', 'Accessibility'] },
      { title: 'MetaSpark', image: 'assets/images/project-6.png', category: 'web design', tags: ['SASS', 'Component UI'] },
      { title: 'Summary', image: 'assets/images/project-7.png', category: 'web development', tags: ['Angular', 'Performance'] },
      { title: 'Task Manager', image: 'assets/images/project-8.jpg', category: 'applications', tags: ['State Mgmt', 'REST API'] },
      { title: 'Arrival', image: 'assets/images/project-9.png', category: 'web development', tags: ['Micro Frontends', 'Webpack'] }
    ],
    keyProjects: [
      {
        title: 'ATITHI - CBIC (Government of India)',
        description: 'Developed secure dynamic forms and complex validations for customs workflows with responsive UI and API integrations.',
        metrics: ['2000+ concurrent users', '35% faster page load', 'High-security workflows'],
        image: 'assets/images/blog-1.jpg'
      },
      {
        title: 'Digital Passport System (DPS) - Hitachi Energy',
        description: 'Built reusable Angular components, implemented NgRx state management, and enabled multilingual and RTL support for global adoption.',
        metrics: ['140+ countries', 'WCAG 2.1 compliance', 'Angular modernization'],
        image: 'assets/images/blog-2.jpg'
      }
    ],
    contact: {
      recipientEmail: 'pankajgupta403104@gmail.com',
      mapEmbedUrl: 'https://www.google.com/maps?q=Bengaluru%2C%20India&output=embed'
    }
  };

  readonly content = signal<SiteContent>(this.clone(this.defaults));

  init(): void {
    const stored = localStorage.getItem(this.key);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as Partial<SiteContent>;
      this.content.set(this.mergeDefaults(parsed));
    } catch {
      this.content.set(this.clone(this.defaults));
    }
  }

  save(content: SiteContent): void {
    this.content.set(this.clone(content));
    localStorage.setItem(this.key, JSON.stringify(this.content()));
  }

  patch(partial: Partial<SiteContent>): void {
    const next = { ...this.content(), ...partial };
    this.save(next);
  }

  reset(): void {
    localStorage.removeItem(this.key);
    this.content.set(this.clone(this.defaults));
  }

  private mergeDefaults(partial: Partial<SiteContent>): SiteContent {
    const profile = { ...this.defaults.profile, ...(partial.profile ?? {}) };
    // Migrate older asset paths to the new folder structure.
    if (profile.resumePdfUrl === 'assets/documents/resume.pdf') profile.resumePdfUrl = this.defaults.profile.resumePdfUrl;
    if (profile.resumeDocxUrl === 'assets/documents/resume.docx') profile.resumeDocxUrl = this.defaults.profile.resumeDocxUrl;
    if (profile.coverLetterPdfUrl === 'assets/documents/cover-letter.pdf') profile.coverLetterPdfUrl = this.defaults.profile.coverLetterPdfUrl;
    if (profile.coverLetterDocxUrl === 'assets/documents/cover-letter.docx') profile.coverLetterDocxUrl = this.defaults.profile.coverLetterDocxUrl;
    if (profile.avatar === 'assets/images/my-avatar.png') {
      profile.avatar = this.defaults.profile.avatar;
    }

    return {
      profile,
      resumeSkills: Array.isArray(partial.resumeSkills) ? partial.resumeSkills : this.clone(this.defaults.resumeSkills),
      portfolioItems: Array.isArray(partial.portfolioItems) ? partial.portfolioItems : this.clone(this.defaults.portfolioItems),
      keyProjects: Array.isArray(partial.keyProjects) ? partial.keyProjects : this.clone(this.defaults.keyProjects),
      contact: { ...this.defaults.contact, ...(partial.contact ?? {}) }
    };
  }

  private clone<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
  }
}
