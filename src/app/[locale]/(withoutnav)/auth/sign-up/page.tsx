"use client";
import { useRef, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authService } from "../../../../../../services/auth";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useTranslations } from "next-intl";
import { useAuthStore } from "../../../../../../store/auth";

const locales = [
  { code: "en", label: "EN", flagCode: "us" },
  { code: "ru", label: "RU", flagCode: "ru" },
  { code: "ja", label: "JP", flagCode: "jp" },
];

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeNav, setActiveNav] = useState("register");
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const t = useTranslations("register");
  const isAuthenticated = useAuthStore((state) => !!state.accessToken);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Пожалуйста, заполните все поля");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      await authService.register(email, password);
      router.push("/auth/sign-in");
    } catch (err) {
      setError("Ошибка регистрации. Пожалуйста, попробуйте снова.");
      console.error("Ошибка регистрации:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    if (id === "login") {
      router.push("/auth/sign-in");
    }
  };

  const navItems = [
    { id: "login", label: t("login") },
    { id: "register", label: t("register") },
  ];

  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState(locales[0]);

  useEffect(() => {
    const localeCode = pathname?.split("/")[1] || "en";
    const locale = locales.find((l) => l.code === localeCode) || locales[0];
    setCurrentLocale(locale);
  }, [pathname]);

  const switchLocale = (code: string) => {
    const newPath = pathname.replace(/^\/(en|ru|ja)/, `/${code}`);
    router.push(newPath);
    setDropdownOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black overflow-hidden">
      <div 
        className={`hidden md:relative md:w-1/2 md:flex flex-col transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
        }`}
      >
        <div className="relative z-10 h-full rounded-lg overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/login_photo.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60"></div>
          <div 
            className={`relative z-10 flex flex-col justify-center items-center text-center h-full px-8 transform transition-all duration-1200 ease-out delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <h1 className="text-5xl font-bold text-white drop-shadow-lg font-satoshi">
              {t("title")}
            </h1>
            <p 
              className={`mt-4 text-lg text-white max-w-md font-satoshi transform transition-all duration-1000 ease-out delay-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              {t("welcomeMessage")}
            </p>
          </div>
        </div>
      </div>

      <div 
        className={`w-full md:w-1/2 flex items-center justify-center bg-black p-4 md:p-8 transform transition-all duration-1000 ease-out delay-200 ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
        }`}
      >
        <div className="w-full max-w-md">
          <div 
            className={`bg-black backdrop-blur-xl border border-gray-700/30 rounded-2xl shadow-2xl p-6 md:p-8 transform transition-all duration-800 ease-out delay-400 ${
              isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          >
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

            {error && (
              <div 
                className={`mb-4 md:mb-6 p-3 md:p-4 bg-red-500/10 border border-red-500/20 rounded-lg transform transition-all duration-500 ${
                  error ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-2 opacity-0 scale-95'
                }`}
              >
                <p className="text-red-400 text-sm text-center font-satoshi">
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div 
                className={`space-y-2 transform transition-all duration-800 ease-out delay-800 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-satoshi text-gray-300"
                >
                  {t("emailLabel")}
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-lg blur-sm animate-pulse"></div>
                  </div>
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

              <div 
                className={`space-y-2 transform transition-all duration-800 ease-out delay-1000 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <label
                  htmlFor="password"
                  className="block text-sm font-satoshi text-gray-300"
                >
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
                      <span>{t("registering")}</span>
                    </div>
                  ) : (
                    <span>{t("registerButton")}</span>
                  )}
                </span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/")}
                className={`w-full py-2 md:py-3 px-4 md:px-6 border border-gray-600/50 rounded-lg text-gray-300 font-satoshi hover:bg-gray-800/50 hover:border-gray-500 hover:scale-105 transition-all duration-300 transform ease-out delay-1400 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                {t("backToHome")}
              </button>

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
            </form>
          </div>
        </div>
      </div>

      <div
        ref={dropdownRef}
        className={`fixed right-4 bottom-4 z-50 flex flex-col items-center transform transition-all duration-800 ease-out delay-2000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <button
          onClick={() => setDropdownOpen((o) => !o)}
          className="fi fi-${currentLocale.flagCode} text-3xl cursor-pointer hover:scale-110 transition-transform duration-200"
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}
          style={{ width: 48, height: 48 }}
        >
          <span
            className={`fi fi-${currentLocale.flagCode} text-3xl right-1`}
          />
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
    </div>
  );
}