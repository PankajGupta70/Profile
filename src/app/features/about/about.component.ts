import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html'
})
export class AboutComponent {
  @Input({ required: true }) active = false;
  readonly language = inject(LanguageService);
}
