import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

type FaqItem = {
  readonly question: string;
  readonly answer: readonly string[];
};

@Component({
  selector: 'app-faq',
  imports: [CommonModule, TranslocoModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {
  faq: readonly (FaqItem & { safeAnswer: SafeHtml[] })[] = [];
  openIndexes = new Set<number>();

  private readonly transloco = inject(TranslocoService);
  private readonly sanitizer = inject(DomSanitizer);

  constructor() {
    this.loadFaq();
  }

  faqTrackBy = (index: number, item: FaqItem) => item.question;
  paragraphTrackBy = (index: number, paragraph: SafeHtml) => index;

  private loadFaq(): void {
    const rawFaq = this.transloco.selectTranslateObject('faq');
    rawFaq.subscribe((faqArr: FaqItem[]) => {
      this.faq = (faqArr || []).map((item) => ({
        ...item,
        safeAnswer: item.answer.map((a) => this.sanitizer.bypassSecurityTrustHtml(a)),
      }));
    });
  }

  toggle(index: number): void {
    if (this.openIndexes.has(index)) {
      this.openIndexes.delete(index);
    } else {
      this.openIndexes.add(index);
    }
  }

  isOpen(index: number): boolean {
    return this.openIndexes.has(index);
  }
}
