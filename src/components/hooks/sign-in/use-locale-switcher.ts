import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

interface Locale {
  code: string;
  label: string;
  flagCode: string;
}

export function useLocaleSwitcher(locales: Locale[]) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState(locales[0]);

  useEffect(() => {
    const localeCode = pathname?.split("/")[1] || "en";
    const locale = locales.find((l) => l.code === localeCode) || locales[0];
    setCurrentLocale(locale);
  }, [pathname, locales]);

  const switchLocale = (code: string) => {
    const newPath = pathname.replace(/^\/(en|ru|ja)/, `/${code}`);
    router.push(newPath);
  };

  return { currentLocale, switchLocale };
}