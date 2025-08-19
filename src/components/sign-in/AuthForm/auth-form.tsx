"use client";

import EmailInput from "./email-input";
import PasswordInput from "./password-input";
import SubmitButton from "./submit-button";
import BackButton from "./back-button";
import ErrorMessage from "../ErrorMessage/error-message";
import DesktopNav from "../AuthNav/desktop-nav";
import { useTranslations } from "next-intl";

interface AuthFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string;
  isLoading: boolean;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  activeNav: string;
  navItems: { id: string; label: string }[];
  handleNavClick: (id: string) => void;
  isVisible: boolean;
}

export default function AuthForm({
  email,
  setEmail,
  password,
  setPassword,
  error,
  isLoading,
  showPassword,
  setShowPassword,
  handleSubmit,
  activeNav,
  navItems,
  handleNavClick,
  isVisible
}: AuthFormProps) {
  const t = useTranslations("login");

  return (
    <div className="w-full max-w-md">
      <div className={`bg-black backdrop-blur-xl border border-gray-700/30 rounded-2xl shadow-2xl p-6 md:p-8 transform transition-all duration-800 ease-out delay-400 ${
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        <div 
          className={`text-center mb-6 md:mb-8 transform transition-all duration-800 ease-out delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-satoshi bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent mb-2">
            {t("title")}
          </h2>
          <p className="text-gray-400 text-sm font-satoshi">
            {t("subtitle")}
          </p>
        </div>

        <ErrorMessage error={error} isVisible={isVisible && !!error} />
        
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <EmailInput email={email} setEmail={setEmail} isVisible={isVisible} />
          <PasswordInput 
            password={password} 
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isVisible={isVisible}
          />
          <SubmitButton isLoading={isLoading} isVisible={isVisible} />
          <BackButton isVisible={isVisible} />
        </form>
        
        <DesktopNav 
          activeNav={activeNav}
          navItems={navItems}
          handleNavClick={handleNavClick}
          isVisible={isVisible}
        />
      </div>
    </div>
  );
}