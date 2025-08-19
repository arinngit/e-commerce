"use client";

import FooterWithNewsletter from "@/components/footer";
import Navbar from "@/components/layout/header/navbar";
import { useTranslations } from "next-intl";

export default function Delivery() {
  const t = useTranslations("delivery");

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8 md:px-6 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 font-satoshi">{t("title")}</h1>

        <div className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 font-satoshi">
            <h2 className="text-xl font-semibold mb-4">
              {t("howItWorks.title")}
            </h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                    {item}
                  </div>
                  <p>{t(`howItWorks.steps.${item}`)}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 font-satoshi">
            <h2 className="text-xl font-semibold mb-4">
              {t("shippingOptions.title")}
            </h2>
            <div className="space-y-4">
              {["standard", "express", "international"].map((option) => (
                <div
                  key={option}
                  className="border-b border-gray-100 pb-4 last:border-0"
                >
                  <h3 className="font-medium text-lg">
                    {t(`shippingOptions.${option}.title`)}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {t(`shippingOptions.${option}.description`)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {t("deliveryTime")}: {t(`shippingOptions.${option}.time`)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t("cost")}: {t(`shippingOptions.${option}.cost`)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 font-satoshi">
            <h2 className="text-xl font-semibold mb-4">{t("returns.title")}</h2>
            <p className="mb-4">{t("returns.policy")}</p>
            <ul className="space-y-2 list-disc pl-5">
              {[1, 2, 3].map((item) => (
                <li key={item}>{t(`returns.items.${item}`)}</li>
              ))}
            </ul>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 font-satoshi">
            <h2 className="text-xl font-semibold mb-4">{t("faq.title")}</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item}>
                  <h3 className="font-medium">
                    {t(`faq.questions.${item}.question`)}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {t(`faq.questions.${item}.answer`)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <FooterWithNewsletter />
    </div>
  );
}
