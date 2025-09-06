"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../../../../store/auth";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useAuthForm } from "@/components/hooks/sign-in/use-auth-form";
import { useVisibilityAnimation } from "@/components/hooks/sign-in/use-visibility-animation";
import { useAuthNav } from "@/components/hooks/sign-in/use-auth-nav";
import { useLocaleSwitcher } from "@/components/hooks/sign-in/use-locale-switcher";
import { useClickOutside } from "@/components/hooks/sign-in/use-click-outside";
import { useTranslations } from "next-intl";
import HeroSection from "@/components/sign-in/HeroSection/hero-section";
import AuthForm from "@/components/sign-in/AuthForm/auth-form";
import LanguageSwitcher from "@/components/sign-in/LanguageSwitcher/language-switcher";

const locales = [
  { code: "en", label: "EN", flagCode: "us" },
  { code: "ru", label: "RU", flagCode: "ru" },
  { code: "ja", label: "JP", flagCode: "jp" },
];

export default function SignIn() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => !!state.accessToken);
  const { isVisible } = useVisibilityAnimation();
  const t = useTranslations("login"); 
  
  const authForm = useAuthForm();
  const { activeNav, navItems, handleNavClick } = useAuthNav();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentLocale, switchLocale } = useLocaleSwitcher(locales);
  
  useClickOutside(dropdownRef, () => setDropdownOpen(false));

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black overflow-hidden">

      <HeroSection isVisible={isVisible} />

      <div className={`w-full md:w-1/2 flex items-center justify-center bg-black p-4 md:p-8 transform transition-all duration-1000 ease-out delay-200 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
      }`}>
        <AuthForm 
          {...authForm}
          activeNav={activeNav}
          navItems={navItems}
          handleNavClick={handleNavClick}
          isVisible={isVisible}
        />
      </div>

      <LanguageSwitcher
        ref={dropdownRef}
        isVisible={isVisible}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        currentLocale={currentLocale}
        switchLocale={switchLocale}
      />
    </div>
  );
}