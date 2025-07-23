'use client';

import { ChevronDown, Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center mb-1">
          <h1 className="text-2xl font-sans font-bold text-black">STORE</h1>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-1 cursor-pointer hover:text-black">
            <span className="text-black font-satoshi hover:text-gray-600">Shop</span>
            <ChevronDown className="w-4 h-4 text-black" />
          </div>
          <Link href="#" className="text-black font-satoshi hover:text-gray-600">On Sale</Link>
          <Link href="#" className="text-black font-satoshi hover:text-gray-600">New Arrivals</Link>
          <Link href="#" className="text-black font-satoshi hover:text-gray-600">Brands</Link>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full pl-10 text-black pr-4 py-2 font-satoshi bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>

          <button className="hidden md:inline-flex p-2 hover:bg-gray-100 rounded-full">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
          </button>
          <button className="hidden md:inline-flex p-2 hover:bg-gray-100 rounded-full">
            <User className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 px-2">
          <Link href="#" className="block text-black hover:text-gray-600">Shop</Link>
          <Link href="#" className="block text-black hover:text-gray-600">On Sale</Link>
          <Link href="#" className="block text-black hover:text-gray-600">New Arrivals</Link>
          <Link href="#" className="block text-black hover:text-gray-600">Brands</Link>
          <div className="relative">
            <Search className="absolute left-3 top-7 transform -translate-y-1/2 text-black w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 text-black bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-black mt-2"
            />
          </div>
          <div className="flex space-x-4 pt-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
