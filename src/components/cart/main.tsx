"use client";

import {
  ChevronRight,
  Minus,
  Plus,
  Trash2,
  Tag,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "../../../store/carts";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../store/auth";


export default function ShoppingCart() {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const t = useTranslations("cartPage");
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => !!state.accessToken);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = items.length > 0 ? 15 : 0;
  const total = subtotal + deliveryFee;

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;

    setIsApplyingPromo(true);
    setTimeout(() => {
      setIsApplyingPromo(false);
      alert(`Promo code "${promoCode}" applied!`);
    }, 1000);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem("returnUrl", window.location.pathname);
      router.push("/auth/sign-in");
      return;
    }
    router.push("/checkout");
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 bg-white min-h-screen">
      <nav className="flex items-center text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6 font-satoshi">
        <Link href="/" className="hover:text-gray-700 transition-colors">
          {t("breadcrumbs.home")}
        </Link>
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2" />
        {t("breadcrumbs.cart")}
      </nav>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-satoshi font-medium text-black mb-6 sm:mb-8">
        {t("title")}
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-300 mb-3 sm:mb-4" />
          <p className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4 font-satoshi font-bold">
            {t("empty.message")}
          </p>
          <Link
            href="/shop"
            className="inline-block bg-black text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-gray-800 transition-colors font-satoshi font-bold text-sm sm:text-base"
          >
            {t("empty.continueShopping")}
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1 sm:mb-2">
                      <h3 className="font-satoshi font-bold text-base sm:text-lg text-black line-clamp-2">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>

                    <div className="text-xs sm:text-sm text-gray-600 mb-1">
                      <span className="font-satoshi font-bold">
                        {t("item.size")}:{" "}
                      </span>
                      <span className="text-black font-satoshi font-bold">
                        {item.size}
                      </span>
                    </div>

                    <div className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                      <span className="font-satoshi font-bold">
                        {t("item.color")}:{" "}
                      </span>
                      <span className="text-black font-satoshi font-bold">
                        {item.color}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-lg sm:text-xl font-satoshi font-bold text-black">
                        ${item.price.toFixed(2)}
                      </span>

                      <div className="flex items-center bg-gray-100 rounded-full font-satoshi font-bold text-sm sm:text-base">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 sm:p-2 hover:bg-gray-200 rounded-full transition-colors"
                          aria-label="Decrease quantity"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <span className="px-2 sm:px-4 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 sm:p-2 hover:bg-gray-200 rounded-full transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 flex items-center gap-2 mt-4 sm:mt-6 font-satoshi font-bold text-sm sm:text-base"
            >
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
              {t("actions.clearCart")}
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-lg p-4 sm:p-6 lg:sticky lg:top-6 shadow-sm">
              <h2 className="text-lg sm:text-xl font-satoshi font-bold text-black mb-4 sm:mb-6">
                {t("summary.title")}
              </h2>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600 font-satoshi font-bold">
                    {t("summary.subtotal")}
                  </span>
                  <span className="font-satoshi font-bold">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600 font-satoshi font-bold">
                    {t("summary.deliveryFee")}
                  </span>
                  <span className="font-satoshi font-bold">
                    ${deliveryFee.toFixed(2)}
                  </span>
                </div>

                <hr className="my-2 sm:my-4 border-gray-200" />

                <div className="flex justify-between text-base sm:text-lg font-satoshi font-bold">
                  <span>{t("summary.total")}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <label
                  htmlFor="promo-code"
                  className="block text-xs sm:text-sm font-satoshi font-bold text-gray-700 mb-1 sm:mb-2"
                >
                  {t("summary.promoCode")}
                </label>
                <div className="flex gap-2 font-satoshi font-bold">
                  <input
                    id="promo-code"
                    type="text"
                    placeholder={t("summary.promoPlaceholder")}
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <button
                    onClick={handleApplyPromo}
                    disabled={!promoCode.trim() || isApplyingPromo}
                    className="bg-black text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {isApplyingPromo ? "Apply" : "Apply"}
                  </button>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-black text-white py-2 sm:py-3 rounded-lg font-satoshi font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base"
              >
                {t("summary.checkout")}
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
