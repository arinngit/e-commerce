"use client";

import { useTranslations } from "next-intl";

interface DesktopNavProps {
  activeNav: string;
  navItems: { id: string; label: string }[];
  handleNavClick: (id: string) => void;
  isVisible: boolean;
}

export default function DesktopNav({
  activeNav,
  navItems,
  handleNavClick,
  isVisible
}: DesktopNavProps) {
  const t = useTranslations("login");

  return (
    <div 
      className={`hidden md:block mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-700/30 transform transition-all duration-800 ease-out delay-1600 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="flex justify-center space-x-4 md:space-x-6 mb-4">
        {navItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`relative px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm font-satoshi transition-all duration-500 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            } ${
              activeNav === item.id
                ? "text-red-500"
                : "text-white hover:text-red-200"
            }`}
            style={{ transitionDelay: `${1700 + index * 100}ms` }}
          >
            {item.label}
            {activeNav === item.id && (
              <>
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 rounded border border-red-800 animate-pulse shadow-sm shadow-red-400/50"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded blur-sm"></div>
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}