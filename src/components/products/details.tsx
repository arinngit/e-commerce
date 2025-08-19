"use client";
import { Product, ProductColor, ProductSize } from "@/types/product";
import { Star, ChevronRight, Plus, Minus, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "../../../store/carts";
import { useTranslations } from "next-intl";

interface ProductDetailsProps {
  product: Product;
}

export default function Details({ product }: ProductDetailsProps) {
  const t = useTranslations("productDetails");
  const availableColors: ProductColor[] = product.variants
    ? Array.from(
        new Map(
          product.variants.map((v) => [
            v.colorId,
            {
              colorId: v.colorId,
              colorName: v.colorName,
              hexCode: v.colorHex,
            },
          ])
        ).values()
      )
    : [{ colorId: 0, colorName: "Default", hexCode: "#808080" }];

  const availableSizes: ProductSize[] = product.variants
    ? Array.from(
        new Map(
          product.variants.map((v) => [
            v.sizeId,
            {
              sizeId: v.sizeId,
              sizeName: v.sizeName,
              quantity: v.quantity,
            },
          ])
        ).values()
      )
    : [
        { sizeId: 1, sizeName: "S", quantity: 0 },
        { sizeId: 2, sizeName: "M", quantity: 0 },
        { sizeId: 3, sizeName: "L", quantity: 0 },
        { sizeId: 4, sizeName: "XL", quantity: 0 },
      ];

  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    availableSizes[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    const selectedVariant = product.variants?.find(
      (v) =>
        v.colorId === availableColors[selectedColor].colorId &&
        v.sizeId === selectedSize.sizeId
    );

    if (selectedVariant) {
      const id = `${product.id}-${selectedVariant.sizeId}-${selectedVariant.colorId}`;

      addItem({
        name: product.name,
        size: selectedVariant.sizeName,
        color: selectedVariant.colorName,
        price: product.price,
        image: product.photoUrl || "",
        sku: selectedVariant.sku,
        quantity: quantity,
      });
    }
  };

  const renderStars = (rating: number = 0) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-5 h-5">
          <Star className="w-5 h-5 text-gray-300 absolute" />
          <div className="overflow-hidden w-2.5">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }

    return stars;
  };

  const getContrastColor = (hexColor: string) => {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#ffffff";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <nav className="flex items-center space-x-2 text-gray-500 mb-8">
        <Link href="/">
          <span className="hover:text-gray-700 cursor-pointer font-satoshi">
            {t("breadcrumbs.home")}
          </span>
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="hover:text-gray-700 cursor-pointer font-satoshi">
          <Link href="/shop">{t("breadcrumbs.shop")}</Link>
        </span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-black font-medium font-satoshi">
          {product.category || t("breadcrumbs.category")}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Изображение продукта */}
        <div className="flex-1 bg-gray-100 rounded-2xl aspect-square flex items-center justify-center">
          {product.photoUrl ? (
            <img
              src={product.photoUrl}
              alt={product.name}
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <div className="w-72 h-72 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-sm">{t("noImage")}</span>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-satoshi font-black text-black">
            {product.name}
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-satoshi font-bold text-black">
              ${product.price}
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed font-satoshi">
            {product.description || t("noDescription")}
          </p>

          {availableColors.length > 0 && (
            <>
              <hr className="border-gray-200" />
              <div className="space-y-4">
                <h3 className="text-gray-600 font-satoshi">
                  {t("selectColors")}
                </h3>
                <div className="flex gap-3">
                  {availableColors.map((color: ProductColor, index: number) => {
                    const contrastColor = getContrastColor(color.hexCode);
                    const isLightColor = contrastColor === "#000000";

                    return (
                      <button
                        key={color.colorId}
                        onClick={() => setSelectedColor(index)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                          isLightColor
                            ? "border-gray-200"
                            : "border-transparent"
                        }`}
                        style={{
                          backgroundColor: color.hexCode,
                        }}
                        aria-label={color.colorName}
                      >
                        {selectedColor === index && (
                          <Check
                            className="w-5 h-5"
                            style={{ color: contrastColor }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          <hr className="border-gray-200" />
          <div className="space-y-4">
            <h3 className="text-gray-600 font-satoshi">{t("chooseSize")}</h3>
            <div className="flex flex-wrap gap-3">
              {availableSizes.map((size: ProductSize) => (
                <button
                  key={size.sizeId}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-3 rounded-full font-satoshi border transition-colors ${
                    selectedSize.sizeId === size.sizeId
                      ? "bg-black text-white border-black"
                      : "bg-gray-100 text-gray-700 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {size.sizeName}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />
          <div className="flex gap-4">
            <div className="flex items-center bg-gray-100 rounded-full">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-gray-200 rounded-full"
                aria-label={t("quantity.decrease")}
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="px-4 text-lg font-satoshi">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-gray-200 rounded-full"
                aria-label={t("quantity.increase")}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white py-4 px-8 rounded-full font-satoshi hover:bg-gray-800 transition-colors"
            >
              {t("addToCart")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
