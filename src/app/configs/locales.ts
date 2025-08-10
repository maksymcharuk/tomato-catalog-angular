export const AVAILABLE_LOCALES = ['en', 'uk'] as const;
export type Locale = (typeof AVAILABLE_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
