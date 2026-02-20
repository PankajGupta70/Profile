import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, inject } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { SiteContentService } from '../../core/services/site-content.service';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResumeComponent {
  @Input({ required: true }) active = false;
  readonly language = inject(LanguageService);
  readonly content = inject(SiteContentService);

  skillLabel(key: string): string {
    return this.language.t(key);
  }

  skillIcon(key: string): string {
    if (key === 'skill_1') return 'logo-angular';
    if (key === 'skill_2') return 'logo-javascript';
    if (key === 'skill_3') return 'swap-horizontal-outline';
    return 'speedometer-outline';
  }

  skillHint(key: string): string {
    if (key === 'skill_1') return 'Angular: 4+ years';
    if (key === 'skill_2') return 'TypeScript & JS: enterprise usage';
    if (key === 'skill_3') return 'RxJS and NgRx: production state flow';
    return 'Performance and quality engineering';
  }
}
