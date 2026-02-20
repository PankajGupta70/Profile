import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';
import { SiteContentService } from '../../core/services/site-content.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SidebarComponent {
  @Output() downloadResume = new EventEmitter<void>();
  @Output() downloadCoverLetter = new EventEmitter<void>();

  readonly language = inject(LanguageService);
  readonly content = inject(SiteContentService);
  readonly expanded = signal(false);
  readonly copiedLabel = signal('');

  toggle(): void {
    this.expanded.update((v) => !v);
  }

  async copyToClipboard(value: string, label: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(value);
      this.copiedLabel.set(`${label} ${this.language.t('copied_suffix')}`);
      setTimeout(() => this.copiedLabel.set(''), 1200);
    } catch {
      this.copiedLabel.set(this.language.t('copy_failed'));
      setTimeout(() => this.copiedLabel.set(''), 1200);
    }
  }

  onAvatarError(event: Event): void {
    const image = event.target as HTMLImageElement | null;
    if (!image) return;
    image.src = 'assets/images/my-avatar.png';
  }
}
