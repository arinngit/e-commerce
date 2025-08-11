"use client";

import {
  ChevronDown,
  LayoutDashboard,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useProductsStore } from "../../../../../store/products";
import { Product } from "@/types/product";
import { useCartStore } from "../../../../../store/carts";
import { useAuthStore } from "../../../../../store/auth";
import SignOutButton from "@/components/ui/sign-out-button";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const locales = [
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "ru", label: "RU", flag: "🇷🇺" },
  { code: "ja", label: "JP", flag: "🇯🇵" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocaleCode = pathname.split("/")[1] || "en";
  const currentLocale =
    locales.find((l) => l.code === currentLocaleCode) || locales[0];

  const { products, fetchProducts, searchProducts } = useProductsStore();
  const { items } = useCartStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results);
  }, [searchQuery, products]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLocale = (localeCode: string) => {
    const newPath = pathname.replace(/^\/(en|ru|ja)/, `/${localeCode}`);
    router.push(newPath);
    setDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProductSelect = (productId: number) => {
    setShowResults(false);
    setSearchQuery("");
    router.push(`/products/${productId}`);
    router.refresh();
  };

  const t = useTranslations("navbar");

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-white/95 border-b border-gray-200 px-4 py-4 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center mb-1">
          <Link href="/">
            <h1 className="text-2xl font-sans font-bold text-black">STORE</h1>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/shop"
            className="text-black font-satoshi hover:text-gray-600"
          >
            {t("shop")}
          </Link>
          <Link
            href="#"
            className="text-black font-satoshi hover:text-gray-600"
          >
            {t("on_sale")}
          </Link>
          <Link
            href="#"
            className="text-black font-satoshi hover:text-gray-600"
          >
            {t("new_arrivals")}
          </Link>
          <Link
            href="#"
            className="text-black font-satoshi hover:text-gray-600"
          >
            {t("brands")}
          </Link>
        </div>

        <div className="relative hidden md:flex" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((open) => !open)}
            className="flex items-center space-x-2 px-3 py-1 rounded border border-gray-300 hover:border-black cursor-pointer select-none"
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
          >
            <span className="text-lg">{currentLocale.flag}</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>

          {dropdownOpen && (
            <ul
              role="listbox"
              className="absolute right-0 mt-11 w-17 bg-white border border-gray-300 rounded shadow-lg z-50"
            >
              {locales.map(({ code, label, flag }) => (
                <li
                  key={code}
                  role="option"
                  aria-selected={code === currentLocaleCode}
                  onClick={() => switchLocale(code)}
                  className={`flex items-center space-x-2 px-2 py-2 cursor-pointer hover:bg-gray-100 ${
                    code === currentLocaleCode
                      ? "bg-gray-200 font-semibold"
                      : ""
                  }`}
                >
                  <span className="text-lg">{flag}</span>
                  <span className="font-satoshi">{label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          className="hidden md:flex items-center flex-1 max-w-md mx-8 relative"
          ref={searchRef}
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
          <input
            type="text"
            placeholder={t("search_placeholder")}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            className="w-full pl-10 text-black pr-4 py-2 font-satoshi bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-black"
          />
          {showResults && searchResults.length > 0 && (
            <div className="absolute z-10 top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => handleProductSelect(product.id)}
                >
                  {product.photoUrl && (
                    <img
                      src={product.photoUrl}
                      alt={product.name}
                      className="w-10 h-10 object-cover mr-3"
                    />
                  )}
                  <div>
                    <div className="font-satoshi font-medium">
                      {product.name}
                    </div>
                    <div className="font-satoshi text-sm text-gray-600">
                      ${product.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>

          <button
            onClick={() => router.push("/cart")}
            className="hidden md:inline-flex p-2 hover:bg-gray-100 rounded-full relative"
            aria-label={t("cart")}
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-satoshi font-medium rounded-full w-5 h-5 flex justify-center">
                {items.length}
              </span>
            )}
          </button>

          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="hover:text-gray-600"
                aria-label={t("dashboard")}
              >
                <LayoutDashboard className="w-6 h-6" />
              </Link>
              <SignOutButton />
            </>
          ) : (
            <button
              onClick={() => router.push("/auth/sign-in")}
              className="hidden md:inline-flex p-2 hover:bg-gray-100 rounded-full"
              aria-label={t("sign_in")}
            >
              <User className="w-6 h-6 text-gray-700" />
            </button>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 px-2">
          <Link href="/shop" className="block text-black hover:text-gray-600">
            {t("shop")}
          </Link>
          <Link href="#" className="block text-black hover:text-gray-600">
            {t("on_sale")}
          </Link>
          <Link href="#" className="block text-black hover:text-gray-600">
            {t("new_arrivals")}
          </Link>
          <Link href="#" className="block text-black hover:text-gray-600">
            {t("brands")}
          </Link>

          <div className="relative" ref={searchRef}>
            <Search className="absolute left-3 top-7 transform -translate-y-1/2 text-black w-5 h-5" />
            <input
              type="text"
              placeholder={t("search_placeholder")}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              className="w-full pl-10 pr-4 py-2 font-satoshi text-black bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-black mt-2"
            />
            {showResults && searchResults.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => handleProductSelect(product.id)}
                  >
                    {product.photoUrl && (
                      <img
                        src={product.photoUrl}
                        alt={product.name}
                        className="w-10 h-10 object-cover mr-3"
                      />
                    )}
                    <div>
                      <div className="font-satoshi">{product.name}</div>
                      <div className="text-sm text-gray-600 font-satoshi">
                        ${product.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex space-x-4 pt-2 items-center">
            <button
              onClick={() => router.push("/cart")}
              className="p-2 hover:bg-gray-100 rounded-full relative"
              aria-label={t("cart")}
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-satoshi font-medium rounded-full w-5 h-5 flex justify-center">
                  {items.length}
                </span>
              )}
            </button>
            {!isAuthenticated && (
              <button
                onClick={() => router.push("/auth/sign-in")}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label={t("sign_in")}
              >
                <User className="w-6 h-6 text-gray-700" />
              </button>
            )}

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((open) => !open)}
                className="ml-6 flex items-center space-x-2 px-3 py-1 rounded border border-gray-300 hover:border-black cursor-pointer select-none"
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
              >
                <span className="text-lg">{currentLocale.flag}</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>

              {dropdownOpen && (
                <ul
                  role="listbox"
                  className="absolute right-0 mt-2 w-17 bg-white border border-gray-300 rounded shadow-lg z-50"
                >
                  {locales.map(({ code, label, flag }) => (
                    <li
                      key={code}
                      role="option"
                      aria-selected={code === currentLocaleCode}
                      onClick={() => switchLocale(code)}
                      className={`flex items-center space-x-2 px-2 py-2 cursor-pointer hover:bg-gray-100 ${
                        code === currentLocaleCode
                          ? "bg-gray-200 font-semibold"
                          : ""
                      }`}
                    >
                      <span className="text-lg">{flag}</span>
                      <span className="font-satoshi">{label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
