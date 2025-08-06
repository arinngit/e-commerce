"use client";
import { ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { useProductsStore } from "../../../store/products";
import Link from "next/link";
import { Product } from "@/types/product";
import { Dialog } from "@headlessui/react";

export default function Main() {
  const { products, isLoading } = useProductsStore();
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Most Popular");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const categories = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const allColors = [
    { name: "Red", color: "bg-red-500" },
    { name: "Blue", color: "bg-blue-500" },
    { name: "Green", color: "bg-green-500" },
    { name: "Black", color: "bg-black" },
    { name: "White", color: "bg-white border border-gray-300" },
    { name: "Yellow", color: "bg-yellow-400" },
    { name: "Orange", color: "bg-orange-500" },
    { name: "Purple", color: "bg-purple-500" },
    { name: "Pink", color: "bg-pink-500" },
    { name: "Brown", color: "bg-[#A52A2A]" },
    { name: "Gray", color: "bg-gray-500" },
    { name: "Cyan", color: "bg-cyan-400" },
    { name: "Magenta", color: "bg-[#FF00FF]" },
  ];

  const getProductColors = (product: Product): string[] => {
    return product.colors?.map((c) => c.colorName) || [];
  };

  const getProductSizes = (product: Product): string[] => {
    return product.sizes?.map((s) => s.sizeName.toUpperCase()) || [];
  };

  const filteredProducts = products.filter((product) => {
    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    const productColors = getProductColors(product);

    const colorMatch =
      selectedColors.length === 0 ||
      productColors.some((pc) => selectedColors.includes(pc));

    const productSizes = getProductSizes(product);

    const sizeMatch =
      selectedSizes.length === 0 ||
      selectedSizes.some((size) => productSizes.includes(size));

    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.some(
        (cat) => product.category?.toLowerCase() === cat.toLowerCase()
      );

    return priceMatch && colorMatch && sizeMatch && categoryMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "Price: Low to High":
        return a.price - b.price;
      case "Price: High to Low":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const resetFilters = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedCategories([]);
    setPriceRange([0, 500]);
  };

  // Компонент фильтров для переиспользования
  const FiltersContent = ({ isMobile = false }) => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold font-satoshi">Categories</h3>
        {categories.map((category) => (
          <div key={category} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`${isMobile ? 'mobile-' : ''}cat-${category}`}
              checked={selectedCategories.includes(category)}
              onChange={() => {
                setSelectedCategories((prev) =>
                  prev.includes(category)
                    ? prev.filter((c) => c !== category)
                    : [...prev, category]
                );
              }}
              className="w-4 h-4"
            />
            <label htmlFor={`${isMobile ? 'mobile-' : ''}cat-${category}`} className="font-satoshi">
              {category}
            </label>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold font-satoshi">Price Range</h3>
        <div className="flex items-center justify-between">
          <span className="font-satoshi">${priceRange[0]}</span>
          <span className="font-satoshi">${priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="0"
          max="500"
          step="10"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], parseInt(e.target.value)])
          }
          className="w-full"
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold font-satoshi">Colors</h3>
        <div className="grid grid-cols-5 gap-3">
          {allColors.map((color) => (
            <button
              key={color.name}
              onClick={() => {
                setSelectedColors((prev) =>
                  prev.includes(color.name)
                    ? prev.filter((c) => c !== color.name)
                    : [...prev, color.name]
                );
              }}
              className={`w-8 h-8 rounded-full ${color.color} ${
                selectedColors.includes(color.name)
                  ? "ring-2 ring-offset-2 ring-black"
                  : ""
              }`}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold font-satoshi">Size</h3>
        <div className="grid grid-cols-2 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => {
                setSelectedSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((s) => s !== size)
                    : [...prev, size]
                );
              }}
              className={`px-3 py-2 text-sm rounded-full border font-satoshi ${
                selectedSizes.includes(size)
                  ? "bg-black text-white border-black"
                  : "bg-gray-100 text-gray-700 border-gray-200"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <button
        className="w-full bg-black text-white py-3 rounded-full font-satoshi font-medium hover:bg-gray-800 transition-colors"
        onClick={resetFilters}
      >
        Reset Filters
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-gray-500 mb-8">
        <Link href="/">
          <span className="hover:text-gray-700 cursor-pointer font-satoshi">
            Home
          </span>
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-black font-satoshi font-medium">Shop</span>
      </nav>

      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-satoshi">Shop</h1>
        <button
          className="flex items-center gap-2 text-sm font-satoshi text-black border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => setIsFiltersOpen(true)}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Mobile Sort */}
      <div className="md:hidden mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-satoshi text-sm">
            {filteredProducts.length} of {products.length} Products
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-satoshi text-sm">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 font-satoshi text-sm"
            >
              <option>Most Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters */}
        <div className="hidden md:block w-80 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-satoshi">Filters</h2>
            <SlidersHorizontal className="w-5 h-5 text-gray-400" />
          </div>
          <FiltersContent />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold font-satoshi">Shop</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-satoshi">
                Showing {filteredProducts.length} of {products.length} Products
              </span>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-satoshi">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 font-satoshi"
                >
                  <option>Most Popular</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {sortedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group cursor-pointer"
              >
                <div className="bg-gray-100 rounded-2xl aspect-square mb-4 overflow-hidden relative">
                  {product.photoUrl ? (
                    <img
                      src={product.photoUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No image</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold font-satoshi text-lg text-black group-hover:text-gray-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold font-satoshi text-black">
                      ${product.price}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 font-satoshi">
                    Sizes:{" "}
                    {product.sizes
                      ?.map((s: { sizeName: any }) => s.sizeName)
                      .join(", ") || "Not specified"}
                  </div>
                  <div className="text-sm text-gray-500 font-satoshi">
                    Colors:{" "}
                    {product.colors
                      ?.map((c: { colorName: any }) => c.colorName)
                      .join(", ") || "Not specified"}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* No Products Message */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg font-satoshi">
                No products found matching your filters
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <Dialog
        open={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        className="relative z-50 md:hidden"
      >
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        {/* Modal */}
        <div className="fixed inset-0 flex items-end">
          <div className="w-full bg-white rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-xl font-bold font-satoshi">Filters</h2>
              <button
                onClick={() => setIsFiltersOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filters Content */}
            <FiltersContent isMobile={true} />

            {/* Apply Button */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                className="w-full bg-black text-white py-3 rounded-full font-satoshi font-medium hover:bg-gray-800 transition-colors"
                onClick={() => setIsFiltersOpen(false)}
              >
                Apply Filters ({filteredProducts.length} products)
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}