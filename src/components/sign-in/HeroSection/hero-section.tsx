import { useTranslations } from "next-intl";

export default function HeroSection({ isVisible }: { isVisible: boolean }) {
  const t = useTranslations("login");
  return (
    <div
      className={`hidden md:relative md:w-1/2 md:flex flex-col transform transition-all duration-1000 ease-out ${
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
      }`}
    >
      <div className="relative z-10 h-full rounded-lg overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/login_photo.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60"></div>

        <div
          className={`relative z-10 flex flex-col justify-center items-center text-center h-full px-8 transform transition-all duration-1200 ease-out delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h1 className="text-5xl font-bold text-white drop-shadow-lg font-satoshi">
            {t("title")}
          </h1>
          <p
            className={`mt-4 text-lg text-white max-w-md font-satoshi transform transition-all duration-1000 ease-out delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            {t("welcomeMessage")}
          </p>
        </div>
      </div>
    </div>
  );
}
