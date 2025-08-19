export const locales = [
  { code: "en", label: "EN", flagCode: "us" },
  { code: "ru", label: "RU", flagCode: "ru" },
  { code: "ja", label: "JP", flagCode: "jp" },
];

export type LocaleCode = (typeof locales)[number]["code"];