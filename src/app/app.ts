import { Component, OnInit, inject, signal } from '@angular/core';
import { PageKey } from './core/models/app.model';
import { LanguageService } from './core/services/language.service';
import { ThemeService } from './core/services/theme.service';
import { SidebarComponent } from './features/sidebar/sidebar.component';
import { NavbarComponent } from './features/navbar/navbar.component';
import { AboutComponent } from './features/about/about.component';
import { ResumeComponent } from './features/resume/resume.component';
import { PortfolioComponent } from './features/portfolio/portfolio.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { ContactComponent } from './features/contact/contact.component';
import { TopControlsComponent } from './shared/components/top-controls/top-controls.component';
import { AdminComponent } from './features/admin/admin.component';
import { SiteContentService } from './core/services/site-content.service';
import { AdminService } from './core/services/admin.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent,
    AboutComponent,
    ResumeComponent,
    PortfolioComponent,
    ProjectsComponent,
    ContactComponent,
    TopControlsComponent,
    AdminComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  readonly language = inject(LanguageService);
  readonly theme = inject(ThemeService);
  readonly content = inject(SiteContentService);
  readonly admin = inject(AdminService);
  readonly currentPage = signal<PageKey>('about');
  readonly adminOpen = signal(false);

  ngOnInit(): void {
    this.theme.init();
    this.language.init();
    this.content.init();
    this.admin.init();
  }

  setPage(page: PageKey): void {
    this.currentPage.set(page);
  }

  toggleAdmin(): void {
    this.adminOpen.update((value) => !value);
  }

  async downloadResume(): Promise<void> {
    const profile = this.content.content().profile;
    const resumeLink = this.pickLink(
      'assets/documents/resume-cover_letter/Pankaj_Gupta_Senior_Angular_Frontend_Developer_CV.pdf',
      'assets/documents/resume-cover_letter/Pankaj_Gupta_Senior_Angular_Frontend_Developer_CV.docx',
      profile.resumePdfUrl,
      profile.resumeDocxUrl
    );
    if (resumeLink) {
      const fileName = resumeLink.toLowerCase().endsWith('.docx')
        ? 'Pankaj_Gupta_Senior_Angular_Frontend_Developer_CV.docx'
        : 'Pankaj_Gupta_Senior_Angular_Frontend_Developer_CV.pdf';
      this.triggerDownload(resumeLink, fileName);
      return;
    }

    const { jsPDF } = await import('jspdf');
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text(profile.name, 20, 20);
    pdf.setFontSize(12);
    pdf.text(this.language.t('profile_title'), 20, 30);
    pdf.text(`Email: ${profile.email}`, 20, 40);
    pdf.text(`Phone: ${profile.phone}`, 20, 48);
    pdf.text(`Location: ${profile.location}`, 20, 56);
    pdf.text(`Experience: ${profile.experience}`, 20, 64);
    pdf.text('Skills: Angular, TypeScript, RxJS, NgRx, SCSS, WCAG 2.1', 20, 76);
    pdf.text('Current Company: Tata Consultancy Services (TCS)', 20, 84);
    pdf.text('Projects: ATITHI-CBIC, DPS-Hitachi Energy', 20, 92);
    pdf.save(`${profile.name.replace(/\s+/g, '-')}-Pankaj_Gupta_Senior_Angular_Frontend_Developer_CV.pdf`);
  }

  downloadCoverLetter(): void {
    const profile = this.content.content().profile;
    const coverLink = this.pickLink(
      'assets/documents/resume-cover_letter/Pankaj_Gupta_Senior_Angular_Frontend_Developer_Cover_letter.pdf',
      'assets/documents/resume-cover_letter/Pankaj_Gupta_Senior_Angular_Frontend_Developer_Cover_letter.docx',
      profile.coverLetterPdfUrl,
      profile.coverLetterDocxUrl
    );
    if (!coverLink) {
      window.alert('Cover letter file not found. Please upload it from Admin panel.');
      return;
    }
    const fileName = coverLink.toLowerCase().endsWith('.docx')
      ? 'Pankaj_Gupta_Senior_Angular_Frontend_Developer_Cover_letter.docx'
      : 'Pankaj_Gupta_Senior_Angular_Frontend_Developer_Cover_letter.pdf';
    this.triggerDownload(coverLink, fileName);
  }

  private triggerDownload(url: string, fileName: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.rel = 'noopener';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  private pickLink(...candidates: Array<string | undefined>): string | null {
    for (const candidate of candidates) {
      const url = candidate?.trim();
      if (url) return url;
    }
    return null;
  }
}
