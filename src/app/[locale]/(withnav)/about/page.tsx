import FooterWithNewsletter from "@/components/footer";
import Navbar from "@/components/layout/header/navbar";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("aboutPage");

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-sans text-center mb-8">
          {t("title")}
        </h1>

        <div className="text-gray-600 font-satoshi font-bold text-center space-y-6 text-base sm:text-lg leading-relaxed">
          {Array.from({ length: 11 }, (_, i) => (
            <p key={i}>{t(`paragraphs.p${i + 1}`)}</p>
          ))}
        </div>
      </div>

      <FooterWithNewsletter />
    </div>
  );
}
