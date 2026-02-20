import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LanguageCode } from '../../../core/models/app.model';
import { LanguageService } from '../../../core/services/language.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-top-controls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './top-controls.component.html',
  styleUrl: './top-controls.component.css'
})
export class TopControlsComponent {
  @Output() adminToggle = new EventEmitter<void>();

  readonly language = inject(LanguageService);
  readonly theme = inject(ThemeService);

  onLanguageChange(value: string): void {
    this.language.setLanguage(value as LanguageCode);
  }

  onThemeChange(value: string): void {
    this.theme.setTheme(value === 'light' ? 'light' : 'dark');
  }

  languageOptionLabel(code: LanguageCode): string {
    if (code === 'auto') return this.language.t('lang_auto');
    if (code === 'en') return this.language.t('lang_en');
    if (code === 'hi') return this.language.t('lang_hi');
    if (code === 'es') return this.language.t('lang_es');
    if (code === 'fr') return this.language.t('lang_fr');
    if (code === 'de') return this.language.t('lang_de');
    return code;
  }
}
