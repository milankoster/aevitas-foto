import type { EnvironmentProviders } from '@angular/core';
import { provideTransloco, TranslocoLoader } from '@jsverse/transloco';
import sharedEn from './shared/en.json';
import homeEn from '../pages/home/i18n/en.json';

class AppTranslocoLoader implements TranslocoLoader {
  getTranslation(lang: string): Promise<Record<string, unknown>> {
    if (lang === 'en') {
      return Promise.resolve({
        ...(sharedEn as Record<string, unknown>),
        ...(homeEn as Record<string, unknown>),
      });
    }

    return Promise.resolve({});
  }
}

export function provideAppTransloco(): EnvironmentProviders[] {
  return provideTransloco({
    config: {
      availableLangs: ['en'],
      defaultLang: 'en',
      reRenderOnLangChange: false,
      prodMode: false,
    },
    loader: AppTranslocoLoader,
  });
}
