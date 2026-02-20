import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { PageKey } from '../../core/models/app.model';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  @Input({ required: true }) currentPage!: PageKey;
  @Output() pageChange = new EventEmitter<PageKey>();

  readonly language = inject(LanguageService);

  setPage(page: PageKey): void {
    this.pageChange.emit(page);
    window.scrollTo(0, 0);
  }
}
