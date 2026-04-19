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
      experience: '5 Years',
      location: 'Delhi, India (Open to Relocation)',
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
      { title: 'Assessment 1', image: 'assets/images/project-7.png', category: 'web development',
        url: 'https://pankajgupta70.github.io/UnStop/', tags: ['Angular', 'NgRx', 'Performance', 'Responsive'] },


      { title: 'Finance', image: 'assets/images/project-1.jpg', category: 'web development', tags: ['Angular', 'NgRx', 'REST API'] },
      // { title: 'Orizon', image: 'assets/images/project-2.png', category: 'web development', tags: ['TypeScript', 'SCSS', 'RxJS'] },
      // { title: 'Fundo', image: 'assets/images/project-3.jpg', category: 'web design', tags: ['UI/UX', 'Figma', 'Responsive'] },
      // { title: 'Brawlhalla', image: 'assets/images/project-4.png', category: 'applications', tags: ['Angular', 'PWA', 'i18n'] },
      // { title: 'DSM.', image: 'assets/images/project-5.png', category: 'web design', tags: ['Design System', 'Accessibility'] },
      // { title: 'MetaSpark', image: 'assets/images/project-6.png', category: 'web design', tags: ['SASS', 'Component UI'] },
      // { title: 'Summary', image: 'assets/images/project-7.png', category: 'web development', tags: ['Angular', 'Performance'] },
      // { title: 'Task Manager', image: 'assets/images/project-8.jpg', category: 'applications', tags: ['State Mgmt', 'REST API'] },
      { title: 'Arrival', image: 'assets/images/project-9.png', category: 'web development', tags: ['Micro Frontends', 'Webpack'] }
    ],
    keyProjects: [
      {
        title: 'ATITHI - CBIC (Government of India)',
        overview: "A national customs declaration platform for international travelers, built for secure, high-volume digital submissions.",
        description: "Developed scalable Angular-based user interfaces with complex workflows, implemented efficient state and data handling using RxJS, and integrated secure REST APIs. Focused on performance optimization through modular architecture, lazy loading, and optimized change detection while ensuring high security and reliability.",
        metrics: [
          "2000+ users",
          "30% faster",
          "National rollout"
        ],
        image: 'assets/images/blog-1.jpg',
        technology_stack: 'Angular 18, TypeScript, RxJS, Reactive Forms, SCSS, REST APIs'
      },
      {
        title: 'Digital Passport System (DPS) - Hitachi Energy',
        overview: "A global enterprise platform for real-time product lifecycle and quality data across multilingual regional teams.",
        description: "Built scalable Angular-based enterprise dashboards with complex data-driven workflows, implemented state management using NgRx and RxJS, and integrated REST APIs for real-time data processing. Enhanced performance using modular architecture, lazy loading, and optimized rendering for global users.",
        metrics: [
          "140+ countries",
          "Scalable UI",
          "Enterprise workflows"
        ],
        image: 'assets/images/blog-2.jpg',
        technology_stack: "Angular 7–15, TypeScript, NgRx, RxJS, Angular Material, SCSS"
      }
    ],
    contact: {
      recipientEmail: 'pankajgupta403104@gmail.com',
      mapEmbedUrl: 'https://www.google.com/maps?q=Delhi%2C%20India&output=embed'
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
