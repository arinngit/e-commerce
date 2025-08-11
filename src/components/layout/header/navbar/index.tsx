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
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useProductsStore } from "../../../../../store/products";
import { Product } from "@/types/product";
import { useCartStore } from "../../../../../store/carts";
import { useAuthStore } from "../../../../../store/auth";
import SignOutButton from "@/components/ui/sign-out-button";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center mb-1">
          <Link href="/">
            <h1 className="text-2xl font-sans font-bold text-black">STORE</h1>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-1 cursor-pointer hover:text-black">
            <Link
              href="/shop"
              className="text-black font-satoshi hover:text-gray-600"
            >
              Shop
            </Link>
          </div>
          <Link
            href="#"
            className="text-black font-satoshi hover:text-gray-600"
          >
            On Sale
          </Link>
          <Link
            href="#"
            className="text-black font-satoshi hover:text-gray-600"
          >
            New Arrivals
          </Link>
          <Link
            href="#"
            className="text-black font-satoshi hover:text-gray-600"
          >
            Brands
          </Link>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full" ref={searchRef}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              className="w-full pl-10 text-black pr-4 py-2 font-satoshi bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-black"
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
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setMenuOpen(!menuOpen)}
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
              <Link href="/dashboard" className="hover:text-gray-600">
                <LayoutDashboard className="w-6 h-6" />
              </Link>
              <SignOutButton />
            </>
          ) : (
            <button
              onClick={() => router.push("/auth/sign-in")}
              className="hidden md:inline-flex p-2 hover:bg-gray-100 rounded-full"
            >
              <User className="w-6 h-6 text-gray-700" />
            </button>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 px-2">
          <Link href="/shop" className="block text-black hover:text-gray-600">
            Shop
          </Link>
          <Link href="#" className="block text-black hover:text-gray-600">
            On Sale
          </Link>
          <Link href="#" className="block text-black hover:text-gray-600">
            New Arrivals
          </Link>
          <Link href="#" className="block text-black hover:text-gray-600">
            Brands
          </Link>
          <div className="relative" ref={searchRef}>
            <Search className="absolute left-3 top-7 transform -translate-y-1/2 text-black w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              className="w-full pl-10 pr-4 py-2 text-black bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-black mt-2"
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
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-600">
                        ${product.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex space-x-4 pt-2">
            <button
              onClick={() => router.push("/cart")}
              className="md:inline-flex p-2 hover:bg-gray-100 rounded-full relative"
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
                
              </>
            ) : (
              <button
                onClick={() => router.push("/auth/sign-in")}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <User className="w-6 h-6 text-gray-700" />
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
