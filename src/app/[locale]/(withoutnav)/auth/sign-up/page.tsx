"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../../../../../../services/auth";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeNav, setActiveNav] = useState("register");
  const router = useRouter();

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
    { id: "login", label: "Login" },
    { id: "register", label: "Register" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black overflow-hidden">
      <div className="hidden md:relative md:w-1/2 md:flex flex-col">
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
          <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-8">
            <h1 className="text-5xl font-bold text-white drop-shadow-lg font-satoshi">
              Welcome
            </h1>
            <p className="mt-4 text-lg text-white max-w-md font-satoshi">
              Register to join the community community
            </p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-black p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="bg-black backdrop-blur-xl border border-gray-700/30 rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-3xl md:text-4xl font-satoshi bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent mb-2">
                Registration
              </h2>
              <p className="text-gray-400 text-sm font-satoshi">
                Create a new account
              </p>
            </div>

            {error && (
              <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm text-center font-satoshi">
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-satoshi text-gray-300"
                >
                  Email
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
                    placeholder="Введите ваш email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-satoshi text-gray-300"
                >
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-lg blur-sm animate-pulse"></div>
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="relative w-full px-3 py-2 md:px-4 md:py-3 bg-gray-900 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-transparent transition-all duration-300 font-satoshi"
                    placeholder="Придумайте пароль"
                    minLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative overflow-hidden py-2 md:py-3 px-4 md:px-6 bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 font-satoshi">
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Register...</span>
                    </div>
                  ) : (
                    "Register"
                  )}
                </span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/")}
                className="w-full py-2 md:py-3 px-4 md:px-6 border border-gray-600/50 rounded-lg text-gray-300 font-satoshi hover:bg-gray-800/50 hover:border-gray-500 transition-all duration-300"
              >
                Back to Home
              </button>

              <div className="hidden md:block mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-700/30">
                <div className="flex justify-center space-x-4 md:space-x-6 mb-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`relative px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm font-satoshi transition-all duration-500 ${
                        activeNav === item.id
                          ? "text-red-500"
                          : "text-white hover:text-red-200"
                      }`}
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
    </div>
  );
}
