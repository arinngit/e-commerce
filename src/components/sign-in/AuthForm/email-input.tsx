"use client";

import { useTranslations } from "next-intl";

interface EmailInputProps {
  email: string;
  setEmail: (email: string) => void;
  isVisible: boolean;
}

export default function EmailInput({ email, setEmail, isVisible }: EmailInputProps) {
  const t = useTranslations("login");
  
  return (
    <div className={`space-y-2 transform transition-all duration-800 ease-out delay-800 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    }`}>
      <label htmlFor="email" className="block text-sm font-satoshi text-gray-300">
        {t("emailLabel")}
      </label>
      <div className="relative group">
        <div className="absolute -inset-0.5 rounded-lg opacity-100 bg-white animate-pulse group-focus-within:hidden"></div>
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-red-400 to-red-600 rounded-lg opacity-0 blur-sm transition-all duration-300 group-focus-within:opacity-100 group-focus-within:animate-pulse"></div>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="relative w-full px-3 py-2 md:px-4 md:py-3 bg-gray-900 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-transparent transition-all duration-300 font-satoshi"
          placeholder={t("emailPlaceholder")}
        />
      </div>
    </div>
  );
}