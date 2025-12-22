import type { EnvironmentProviders } from '@angular/core';
import { provideTransloco, TranslocoLoader } from '@jsverse/transloco';
import sharedEn from './shared/en.json';
import homeEn from '../pages/home/i18n/en.json';
import contactEn from '../pages/contact/i18n/en.json';
import sharedSv from './shared/sv.json';
import homeSv from '../pages/home/i18n/sv.json';
import contactSv from '../pages/contact/i18n/sv.json';

class AppTranslocoLoader implements TranslocoLoader {
  getTranslation(lang: string): Promise<Record<string, unknown>> {
    if (lang === 'en') {
      return Promise.resolve({
        ...(sharedEn as Record<string, unknown>),
        ...(homeEn as Record<string, unknown>),
        ...(contactEn as Record<string, unknown>),
      });
    }

    if (lang === 'sv') {
      return Promise.resolve({
        ...(sharedSv as Record<string, unknown>),
        ...(homeSv as Record<string, unknown>),
        ...(contactSv as Record<string, unknown>),
      });
    }

    return Promise.resolve({});
  }
}

export function provideAppTransloco(): EnvironmentProviders[] {
  return provideTransloco({
    config: {
      availableLangs: ['en', 'sv'],
      defaultLang: 'sv',
      fallbackLang: 'en',
      reRenderOnLangChange: true,
      prodMode: false,
    },
    loader: AppTranslocoLoader,
  });
}
