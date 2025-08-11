import { Mail } from "lucide-react";
import { Twitter, Facebook, Instagram, Github } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function FooterWithNewsletter() {
  const t = useTranslations("footer");

  const companyLinks = ["about", "features", "works", "career"];
  const helpLinks = ["support", "delivery", "terms", "privacy"];
  const faqLinks = ["account", "deliveries", "orders", "payments"];
  const resourcesLinks = ["ebooks", "tutorial", "blog", "youtube"];

  return (
    <footer className="relative mt-20 md:mt-60">
      <section className="flex justify-center absolute -top-20 md:-top-40 w-full z-10 px-4">
        <div className="bg-black w-full max-w-6xl flex flex-col md:flex-row justify-between items-center p-6 md:p-20 rounded-2xl text-white gap-6 md:gap-0">
          <div className="text-center md:text-left flex gap-5 flex-col">
            <h1 className="text-2xl md:text-4xl font-bold">
              {t("newsletter.titleLine1")}
            </h1>
            <h1 className="text-2xl md:text-4xl font-bold">
              {t("newsletter.titleLine2")}
            </h1>
          </div>

          <div className="flex gap-4 flex-col w-full md:w-auto">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="py-3 md:py-4 pl-12 pr-6 w-full rounded-full font-satoshi text-black bg-white focus:outline-none text-sm md:text-base"
              />
            </div>
            <button className="py-3 md:py-4 px-6 w-full rounded-full text-black bg-white focus:outline-none">
              <p className="font-satoshi font-medium text-sm md:text-base">
                {t("newsletter.button")}
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="bg-[#F0F0F0] pt-28 md:pt-50 pb-20 md:pb-40 px-4 md:px-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 lg:justify-between">
          {/* About Section (остаётся без изменений) */}
          <div className="flex flex-col gap-6 md:gap-10 lg:max-w-xs">
            <h1 className="text-3xl md:text-5xl font-bold">
              {t("aboutSection.title")}
            </h1>
            <p className="font-satoshi text-sm md:text-base">
              {t("aboutSection.description")}
            </p>
            <div className="flex gap-3 md:gap-4">
              <a
                href="#"
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-800 hover:text-white transition"
                aria-label={t("social.twitter")}
              >
                <Twitter className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition"
                aria-label={t("social.facebook")}
              >
                <Facebook className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-800 hover:text-white transition"
                aria-label={t("social.instagram")}
              >
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-800 hover:text-white transition"
                aria-label={t("social.github")}
              >
                <Github className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
            {/* Company Links */}
            <div className="flex flex-col gap-4 md:gap-6">
              <h3 className="font-satoshi font-bold text-sm md:text-base">
                {t("links.company.title")}
              </h3>
              <div className="flex flex-col gap-3 md:gap-4">
                {companyLinks.map((link) => (
                  <Link key={link} href="#">
                    <p className="font-satoshi text-sm md:text-base hover:text-gray-600 cursor-pointer transition">
                      {t(`links.company.${link}`)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Help Links */}
            <div className="flex flex-col gap-4 md:gap-6">
              <h3 className="font-satoshi font-bold text-sm md:text-base">
                {t("links.help.title")}
              </h3>
              <div className="flex flex-col gap-3 md:gap-4">
                {helpLinks.map((link) => (
                  <Link key={link} href="#">
                    <p className="font-satoshi text-sm md:text-base hover:text-gray-600 cursor-pointer transition">
                      {t(`links.help.${link}`)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* FAQ Links */}
            <div className="flex flex-col gap-4 md:gap-6">
              <h3 className="font-satoshi font-bold text-sm md:text-base">
                {t("links.faq.title")}
              </h3>
              <div className="flex flex-col gap-3 md:gap-4">
                {faqLinks.map((link) => (
                  <Link key={link} href="#">
                    <p className="font-satoshi text-sm md:text-base hover:text-gray-600 cursor-pointer transition">
                      {t(`links.faq.${link}`)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Resources Links */}
            <div className="flex flex-col gap-4 md:gap-6">
              <h3 className="font-satoshi font-bold text-sm md:text-base">
                {t("links.resources.title")}
              </h3>
              <div className="flex flex-col gap-3 md:gap-4">
                {resourcesLinks.map((link) => (
                  <Link key={link} href="#">
                    <p className="font-satoshi text-sm md:text-base hover:text-gray-600 cursor-pointer transition">
                      {t(`links.resources.${link}`)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-[#F0F0F0] md:px-20 -mt-16">
        <div className="w-full h-[1px] bg-gray-300 mb-9" />
        <div className="pb-6 flex justify-center md:justify-start">
          <p className="font-satoshi text-xs md:text-sm text-gray-600">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
