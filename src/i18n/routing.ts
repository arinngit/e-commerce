import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en', 'ru', 'ja'],
 
  defaultLocale: 'en'
});