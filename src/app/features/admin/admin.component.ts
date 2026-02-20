import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupportedLanguage } from '../../core/models/app.model';
import { AdminService } from '../../core/services/admin.service';
import { LanguageService } from '../../core/services/language.service';
import { SiteContentService } from '../../core/services/site-content.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  @Input({ required: true }) open = false;
  @Output() close = new EventEmitter<void>();

  readonly admin = inject(AdminService);
  readonly language = inject(LanguageService);
  readonly contentService = inject(SiteContentService);

  password = '';
  loginError = '';
  statusMessage = '';
  roleText = '';
  newPassword = '';

  profile = this.clone(this.contentService.content().profile);
  contact = this.clone(this.contentService.content().contact);
  skillsJson = JSON.stringify(this.contentService.content().resumeSkills, null, 2);
  portfolioJson = JSON.stringify(this.contentService.content().portfolioItems, null, 2);
  keyProjectsJson = JSON.stringify(this.contentService.content().keyProjects, null, 2);
  translationJson = '';

  constructor() {
    effect(() => {
      this.contentService.content();
      this.profile = this.clone(this.contentService.content().profile);
      this.contact = this.clone(this.contentService.content().contact);
      this.skillsJson = JSON.stringify(this.contentService.content().resumeSkills, null, 2);
      this.portfolioJson = JSON.stringify(this.contentService.content().portfolioItems, null, 2);
      this.keyProjectsJson = JSON.stringify(this.contentService.content().keyProjects, null, 2);
    });

    effect(() => {
      const lang = this.language.active();
      this.translationJson = JSON.stringify(this.language.getLanguageMap(lang), null, 2);
      this.roleText = this.language.getLanguageMap(lang)['profile_title'] ?? '';
    });
  }

  login(): void {
    const ok = this.admin.login(this.password);
    this.loginError = ok ? '' : 'Invalid password.';
    this.password = '';
  }

  logout(): void {
    this.admin.logout();
    this.statusMessage = 'Logged out.';
  }

  saveProfile(): void {
    this.contentService.patch({ profile: this.clone(this.profile) });
    this.statusMessage = 'Profile saved.';
  }

  onDocumentSelected(
    event: Event,
    key: 'resumePdfUrl' | 'resumeDocxUrl' | 'coverLetterPdfUrl' | 'coverLetterDocxUrl'
  ): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.profile[key] = String(reader.result ?? '');
      this.saveProfile();
      this.statusMessage = `${file.name} uploaded successfully.`;
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  saveRole(): void {
    this.language.setLanguageMap(this.language.active(), { profile_title: this.roleText });
    this.statusMessage = `Role text saved for ${this.language.active().toUpperCase()}.`;
  }

  saveContact(): void {
    this.contentService.patch({ contact: this.clone(this.contact) });
    this.statusMessage = 'Contact config saved.';
  }

  saveSkills(): void {
    const parsed = this.parseJson(this.skillsJson);
    if (!parsed) return;
    this.contentService.patch({ resumeSkills: parsed });
    this.statusMessage = 'Resume skills saved.';
  }

  savePortfolio(): void {
    const parsed = this.parseJson(this.portfolioJson);
    if (!parsed) return;
    this.contentService.patch({ portfolioItems: parsed });
    this.statusMessage = 'Portfolio saved.';
  }

  saveKeyProjects(): void {
    const parsed = this.parseJson(this.keyProjectsJson);
    if (!parsed) return;
    this.contentService.patch({ keyProjects: parsed });
    this.statusMessage = 'Key projects saved.';
  }

  saveTranslations(): void {
    const parsed = this.parseJson(this.translationJson) as Record<string, string> | null;
    if (!parsed) return;
    this.language.setLanguageMap(this.language.active(), parsed);
    this.statusMessage = `Translations saved for ${this.language.active().toUpperCase()}.`;
  }

  savePassword(): void {
    if (!this.newPassword.trim()) {
      this.loginError = 'Password cannot be empty.';
      return;
    }
    this.admin.setPassword(this.newPassword);
    this.newPassword = '';
    this.loginError = '';
    this.statusMessage = 'Admin password updated.';
  }

  resetAll(): void {
    this.contentService.reset();
    this.language.resetTranslations();
    this.statusMessage = 'Content and translations reset to defaults.';
  }

  activeLanguage(): SupportedLanguage {
    return this.language.active();
  }

  private parseJson(value: string): any | null {
    try {
      this.loginError = '';
      return JSON.parse(value);
    } catch {
      this.loginError = 'Invalid JSON. Please fix formatting before save.';
      return null;
    }
  }

  private clone<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
  }
}
