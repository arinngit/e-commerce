"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  isVisible: boolean;
}

export default function BackButton({ isVisible }: BackButtonProps) {
  const t = useTranslations("login");
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      className={`w-full py-2 md:py-3 px-4 md:px-6 border border-gray-600/50 rounded-lg text-gray-300 font-satoshi hover:bg-gray-800/50 hover:border-gray-500 hover:scale-105 transition-all duration-300 transform ease-out delay-1400 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <span>{t("backToHome")}</span>
    </button>
  );
}