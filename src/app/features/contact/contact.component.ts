import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, computed, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService } from '../../core/services/language.service';
import { SiteContentService } from '../../core/services/site-content.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactComponent {
  @Input({ required: true }) active = false;
  readonly language = inject(LanguageService);
  readonly content = inject(SiteContentService);
  private readonly sanitizer = inject(DomSanitizer);

  readonly safeMapUrl = computed(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(this.content.content().contact.mapEmbedUrl)
  );

  formModel = {
    fullname: '',
    email: '',
    message: ''
  };

  onSubmit(form: NgForm): void {
    if (!form.valid) return;
    const recipient = this.content.content().contact.recipientEmail;
    const subject = encodeURIComponent(`Portfolio contact from ${this.formModel.fullname}`);
    const body = encodeURIComponent(
      `Name: ${this.formModel.fullname}\nEmail: ${this.formModel.email}\n\nMessage:\n${this.formModel.message}`
    );
    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, '_blank', 'noopener,noreferrer');
    form.resetForm();
  }
}
