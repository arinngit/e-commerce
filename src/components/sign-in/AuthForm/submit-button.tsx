"use client";

import { useTranslations } from "next-intl";

interface SubmitButtonProps {
  isLoading: boolean;
  isVisible: boolean;
}

export default function SubmitButton({ isLoading, isVisible }: SubmitButtonProps) {
  const t = useTranslations("login");

  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full relative overflow-hidden py-2 md:py-3 px-4 md:px-6 bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group transform ease-out delay-1200 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <span className="relative z-10 font-satoshi">
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>{t("signingIn")}</span>
          </div>
        ) : (
          <span>{t("signInButton")}</span>
        )}
      </span>
    </button>
  );
}