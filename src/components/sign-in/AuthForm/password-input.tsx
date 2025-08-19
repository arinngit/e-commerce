"use client";

import { useTranslations } from "next-intl";

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  isVisible: boolean;
}

export default function PasswordInput({
  password,
  setPassword,
  showPassword,
  setShowPassword,
  isVisible
}: PasswordInputProps) {
  const t = useTranslations("login");

  return (
    <div className={`space-y-2 transform transition-all duration-800 ease-out delay-1000 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    }`}>
      <label htmlFor="password" className="block text-sm font-satoshi text-gray-300">
        {t("passwordLabel")}
      </label>
      <div className="relative group">
        <div className="absolute -inset-0.5 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-lg blur-sm animate-pulse"></div>
        </div>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="relative w-full px-3 py-2 md:px-4 md:py-3 bg-gray-900 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-transparent transition-all duration-300 font-satoshi pr-10"
          placeholder={t("passwordPlaceholder")}
          minLength={6}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none transition-colors duration-200"
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}