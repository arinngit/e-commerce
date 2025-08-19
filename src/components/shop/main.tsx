"use client";
import { ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { useProductsStore } from "../../../store/products";
import Link from "next/link";
import { Product } from "@/types/product";
import { Dialog } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { Slider } from "../ui/slider";
import { debounce } from "lodash";

export default function Main() {
  const t = useTranslations("shopPage");
  const { products, isLoading } = useProductsStore();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState(t("sort.popular"));
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  const handlePriceChange = debounce((value: number[]) => {
    setPriceRange(value as [number, number]);
  }, 50);

  const getProductColors = (product: Product): string[] => {
    if (product.variants && product.variants.length > 0) {
      return [...new Set(product.variants.map((v) => v.colorName))];
    }
    return product.colors?.map((c) => c.colorName) || [];
  };

  const getProductSizes = (product: Product): string[] => {
    if (product.variants && product.variants.length > 0) {
      return [
        ...new Set(product.variants.map((v) => v.sizeName.toUpperCase())),
      ];
    }
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
      case t("sort.priceLow"):
        return a.price - b.price;
      case t("sort.priceHigh"):
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const totalPages = Math.max(
    1,
    Math.ceil(sortedProducts.length / itemsPerPage)
  );

  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedCategories([]);
    setPriceRange([0, 500]);
  };

  const FiltersContent = ({ isMobile = false }) => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold font-satoshi">
          {t("filters.categories")}
        </h3>
        {categories.map((category) => (
          <div key={category} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`${isMobile ? "mobile-" : ""}cat-${category}`}
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
            <label
              htmlFor={`${isMobile ? "mobile-" : ""}cat-${category}`}
              className="font-satoshi"
            >
              {category}
            </label>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold font-satoshi">
          {t("filters.priceRange")}
        </h3>
        <div className="flex items-center justify-between">
          <span className="font-satoshi">${priceRange[0]}</span>
          <span className="font-satoshi">${priceRange[1]}</span>
        </div>
        <Slider
          defaultValue={priceRange}
          min={0}
          max={500}
          step={1}
          onValueChange={handlePriceChange}
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold font-satoshi">{t("filters.colors")}</h3>
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
        <h3 className="font-semibold font-satoshi">{t("filters.sizes")}</h3>
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
        {t("filters.reset")}
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        {t("loading")}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <nav className="flex items-center space-x-2 text-gray-500 mb-8">
        <Link href="/">
          <span className="hover:text-gray-700 cursor-pointer font-satoshi">
            {t("breadcrumbs.home")}
          </span>
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-black font-satoshi font-medium">
          {t("breadcrumbs.shop")}
        </span>
      </nav>

      <div className="md:hidden flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-satoshi">{t("title")}</h1>
        <button
          className="flex items-center gap-2 text-sm font-satoshi text-black border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => setIsFiltersOpen(true)}
        >
          <SlidersHorizontal className="w-4 h-4" />
          {t("filters.showFilters")}
        </button>
      </div>

      <div className="md:hidden mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-satoshi text-sm">
            {t("productCount", {
              filtered: filteredProducts.length,
              total: products.length,
            })}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-satoshi text-sm">
              {t("sort.label")}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 font-satoshi text-sm"
            >
              <option>{t("sort.popular")}</option>
              <option>{t("sort.priceLow")}</option>
              <option>{t("sort.priceHigh")}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="hidden md:block w-80 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-satoshi">
              {t("filters.title")}
            </h2>
            <SlidersHorizontal className="w-5 h-5 text-gray-400" />
          </div>
          <FiltersContent />
        </div>

        <div className="flex-1">
          <div className="hidden md:flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold font-satoshi">{t("title")}</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-satoshi">
                {t("productCount", {
                  filtered: filteredProducts.length,
                  total: products.length,
                })}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-satoshi">
                  {t("sort.label")}
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 font-satoshi"
                >
                  <option>{t("sort.popular")}</option>
                  <option>{t("sort.priceLow")}</option>
                  <option>{t("sort.priceHigh")}</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {currentProducts.map((product) => (
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
                    {t("product.sizes", {
                      sizes:
                        product.variants?.map((v) => v.sizeName).join(", ") ||
                        product.sizes?.map((s) => s.sizeName).join(", ") ||
                        t("product.noSizes"),
                    })}
                  </div>

                  <div className="text-sm text-gray-500 font-satoshi">
                    {t("product.colors", {
                      colors:
                        product.variants?.map((v) => v.colorName).join(", ") ||
                        product.colors?.map((c) => c.colorName).join(", ") ||
                        t("product.noColors"),
                    })}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === index + 1
                    ? "bg-black text-white font-satoshi font-medium"
                    : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg font-satoshi">
                {t("noProducts")}
              </p>
            </div>
          )}
        </div>
      </div>

      <Dialog
        open={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        className="relative z-50 md:hidden"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-end">
          <div className="w-full bg-white rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-xl font-bold font-satoshi">
                {t("filters.title")}
              </h2>
              <button
                onClick={() => setIsFiltersOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <FiltersContent isMobile={true} />

            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                className="w-full bg-black text-white py-3 rounded-full font-satoshi font-medium hover:bg-gray-800 transition-colors"
                onClick={() => setIsFiltersOpen(false)}
              >
                {t("filters.apply", { count: filteredProducts.length })}
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
