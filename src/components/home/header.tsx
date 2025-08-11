"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("header");

  const scrollToArrivals = () => {
    const arrivalsSection = document.getElementById("arrivals");
    if (arrivalsSection) {
      arrivalsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans text-black leading-tight text-center lg:text-left">
                <div>{t("title_line1")}</div>
                {t("title_line2") && (
                  <div className="mt-4">{t("title_line2")}</div>
                )}
                {t("title_line3") && (
                  <div className="mt-3">{t("title_line3")}</div>
                )}
              </h1>

              <p className="text-gray-600 font-satoshi font-regular text-center lg:text-left">
                {t("description")}
              </p>

              <div className="flex justify-center lg:justify-start">
                <button
                  onClick={scrollToArrivals}
                  className="bg-black text-white font-satoshi font-regular px-12 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  {t("shop_now")}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="text-center md:text-left">
                <div className="text-3xl md:text-3xl font-satoshi font-bold text-black">
                  {t("stats.brands_number")}
                </div>
                <div className="text-gray-600 font-satoshi font-regular">
                  {t("stats.brands_label")}
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl md:text-3xl font-satoshi font-bold text-black">
                  {t("stats.products_number")}
                </div>
                <div className="text-gray-600 font-satoshi font-regular">
                  {t("stats.products_label")}
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl md:text-3xl font-satoshi font-bold text-black">
                  {t("stats.customers_number")}
                </div>
                <div className="text-gray-600 font-satoshi font-regular">
                  {t("stats.customers_label")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden w-full flex justify-center mt-8">
        <Image
          src="/man.png"
          alt={t("image_alt")}
          width={300}
          height={400}
          className="object-contain"
          priority
        />
      </div>

      <div className="hidden lg:block absolute right-0 bottom-0 z-0">
        <Image
          src="/man.png"
          alt={t("image_alt")}
          width={500}
          height={600}
          className="object-contain"
          priority
        />
      </div>
    </section>
  );
}
