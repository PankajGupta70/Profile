import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { SiteContentService } from '../../core/services/site-content.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  @Input({ required: true }) active = false;
  readonly language = inject(LanguageService);
  readonly content = inject(SiteContentService);

  projectMetrics(project: { metrics?: string[] }, index: number): string[] {
    if (project.metrics?.length) return project.metrics;
    if (index === 0) return ['2000+ users', '35% faster load', 'Secure compliance'];
    return ['140+ countries', 'RTL + i18n', 'Enterprise scale'];
  }
}
