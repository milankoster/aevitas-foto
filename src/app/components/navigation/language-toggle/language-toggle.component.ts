import { ChangeDetectionStrategy, Component, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

const STORAGE_KEY = 'aevitas-lang';
const LANGUAGE_CONFIG = {
  sv: { code: 'SV', label: 'Svenska', flag: '🇸🇪' },
  en: { code: 'EN', label: 'English', flag: '🇬🇧' },
} as const;

const SUPPORTED_LANGS = Object.keys(LANGUAGE_CONFIG) as (keyof typeof LANGUAGE_CONFIG)[];
type SupportedLang = (typeof SUPPORTED_LANGS)[number];

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './language-toggle.component.html',
  styleUrls: ['./language-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageToggleComponent implements OnInit {
  readonly LANGUAGE_CONFIG = LANGUAGE_CONFIG;

  currentLang: SupportedLang = 'sv';
  isOpen = false;

  private readonly transloco = inject(TranslocoService);

  get currentConfig(): (typeof LANGUAGE_CONFIG)[SupportedLang] {
    return LANGUAGE_CONFIG[this.currentLang];
  }

  /** All languages except the current one; used for the dropdown list. */
  get otherLangs(): SupportedLang[] {
    return SUPPORTED_LANGS.filter((l) => l !== this.currentLang);
  }

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

  select(lang: SupportedLang): void {
    this.setLang(lang, true);
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
