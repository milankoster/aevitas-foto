import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

const STORAGE_KEY = 'aevitas-lang';
const SUPPORTED_LANGS = ['en', 'sv'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './language-toggle.component.html',
  styleUrls: ['./language-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageToggleComponent implements OnInit {
  currentLang: SupportedLang = 'sv';
  isOpen = false;

  constructor(private readonly transloco: TranslocoService) {}

  ngOnInit(): void {
    const stored = (localStorage.getItem(STORAGE_KEY) as SupportedLang | null) ?? null;
    if (stored && SUPPORTED_LANGS.includes(stored)) {
      this.setLang(stored, false);
    } else {
      this.setLang('sv', true);
    }
  }

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

  selectOther(): void {
    const next: SupportedLang = this.currentLang === 'sv' ? 'en' : 'sv';
    this.setLang(next, true);
    this.isOpen = false;
  }

  private setLang(lang: SupportedLang, persist: boolean): void {
    this.currentLang = lang;
    this.transloco.setActiveLang(lang);
    if (persist) {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (!target) {
      return;
    }
    if (!target.closest('button[data-lang-toggle]') && !target.closest('div[data-lang-dropdown]')) {
      this.isOpen = false;
    }
  }
}
