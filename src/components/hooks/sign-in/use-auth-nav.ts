import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export function useAuthNav() {
  const router = useRouter();
  const t = useTranslations("login");
  const [activeNav, setActiveNav] = useState("login");

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    if (id === "register") {
      router.push("/auth/sign-up");
    }
  };

  const navItems = [
    { id: "login", label: t("login") },
    { id: "register", label: t("register") },
  ];

  return { activeNav, navItems, handleNavClick, t };
}