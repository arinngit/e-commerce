"use client";

import { forwardRef } from "react";
import {locales} from "../../../app/constants/locales"

export type Locale = (typeof locales)[number];

interface LanguageSwitcherProps {
  isVisible: boolean;
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
  currentLocale: Locale;
  switchLocale: (code: Locale["code"]) => void;
}

const LanguageSwitcher = forwardRef<HTMLDivElement, LanguageSwitcherProps>(
  ({ isVisible, dropdownOpen, setDropdownOpen, currentLocale, switchLocale }, ref) => {
    return (
      <div
        ref={ref}
        className={`fixed right-4 bottom-4 z-50 flex flex-col items-center transform transition-all duration-800 ease-out delay-2000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`fi fi-${currentLocale.flagCode} text-3xl cursor-pointer hover:scale-110 transition-transform duration-200`}
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}
          style={{ width: 48, height: 48 }}
        >
        </button>

        {dropdownOpen && (
          <ul
            role="listbox"
            className={`mb-2 flex flex-col space-y-1 transform transition-all duration-300 ${
              dropdownOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-2 opacity-0 scale-95'
            }`}
            style={{ minWidth: 48 }}
          >
            {locales
              .filter((l) => l.code !== currentLocale.code)
              .map(({ code, flagCode }, index) => (
                <li
                  key={code}
                  role="option"
                  onClick={() => switchLocale(code)}
                  className={`cursor-pointer hover:bg-gray-100 rounded flex justify-center hover:scale-110 transition-all duration-200 transform ${
                    dropdownOpen ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
                  }`}
                  style={{ 
                    width: 48, 
                    height: 48,
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  <span className={`fi fi-${flagCode} text-3xl`} />
                </li>
              ))}
          </ul>
        )}
      </div>
    );
  }
);

LanguageSwitcher.displayName = "LanguageSwitcher";
export default LanguageSwitcher;