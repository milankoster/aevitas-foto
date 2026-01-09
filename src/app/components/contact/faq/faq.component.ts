import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

type FaqKeyItem = {
  question: string;
  answer: string[];
};

@Component({
  selector: 'app-faq',
  imports: [CommonModule, TranslocoModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent implements OnDestroy {
  faqKeys: readonly FaqKeyItem[] = [];
  openIndexes = new Set<number>();

  private readonly transloco = inject(TranslocoService);
  private langSub = this.transloco.selectTranslateObject('faqKeys').subscribe((faqArr: FaqKeyItem[]) => {
    this.faqKeys = faqArr || [];
  });

  constructor() {
    this.transloco.selectTranslateObject('faqKeys').subscribe((faqArr: FaqKeyItem[]) => {
      this.faqKeys = faqArr || [];
    });
  }

  faqTrackBy = (index: number, item: FaqKeyItem): string => item.question;
  paragraphTrackBy = (index: number): number => index;

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

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }
}
