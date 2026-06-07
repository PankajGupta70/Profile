import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { KeyProjectItem } from '../../core/models/app.model';
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

  caseStudyDetails(project: KeyProjectItem, index: number): Array<{ label: string; text: string }> {
    const fallback = index === 0
      ? {
          problem: 'Secure customs workflows needed dynamic forms, strict validations, and reliable digital submissions.',
          role: 'Built Angular UI modules, reactive forms, workflow screens, and REST API integration.',
          impact: 'Supported high-volume government operations with scalable, production-ready frontend flows.'
        }
      : {
          problem: 'Global teams needed multilingual product data workflows that stayed consistent across regions.',
          role: 'Built reusable Angular components, NgRx state flows, dashboards, and API-driven views.',
          impact: 'Improved enterprise workflow consistency with scalable UI, i18n, and RTL-ready screens.'
        };
    const details = project.caseStudy ?? fallback;

    return [
      { label: 'Problem', text: details.problem },
      { label: 'My Role', text: details.role },
      { label: 'Impact', text: details.impact }
    ];
  }
}
