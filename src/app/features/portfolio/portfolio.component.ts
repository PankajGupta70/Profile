import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, computed, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { SiteContentService } from '../../core/services/site-content.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PortfolioComponent {
  @Input({ required: true }) active = false;
  readonly language = inject(LanguageService);
  readonly content = inject(SiteContentService);

  readonly selected = signal<string>('all');
  readonly categories = computed(() => {
    const categories = this.content
      .content()
      .portfolioItems.map((item) => item.category)
      .filter((value, index, arr) => arr.indexOf(value) === index);
    return ['all', ...categories];
  });

  readonly filtered = computed(() => {
    const category = this.selected();
    const projects = this.content.content().portfolioItems;
    return category === 'all' ? projects : projects.filter((p) => p.category === category);
  });

  setCategory(category: string): void {
    this.selected.set(category);
  }

  categoryLabel(category: string): string {
    if (category === 'all') return this.language.t('filter_all');
    if (category === 'web design') return this.language.t('filter_web_design');
    if (category === 'applications') return this.language.t('filter_app');
    if (category === 'web development') return this.language.t('filter_web_dev');
    return category;
  }

  projectTags(project: { tags?: string[]; category: string }): string[] {
    if (project.tags?.length) return project.tags;
    if (project.category === 'web design') return ['UI/UX', 'Responsive'];
    if (project.category === 'applications') return ['Angular', 'RxJS'];
    return ['Angular', 'TypeScript', 'REST API'];
  }
}
