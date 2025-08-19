"use client";

import DesktopNav from "./desktop-nav";
import MobileNav from "./mobile-nav";
import { AuthNavProps } from "@/types/sign-in-props";

interface AuthNavWrapperProps extends AuthNavProps {
  isVisible: boolean;
}

export default function AuthNav({
  activeNav,
  navItems,
  handleNavClick,
  isVisible
}: AuthNavWrapperProps) {
  return (
    <>
      <MobileNav
        activeNav={activeNav}
        navItems={navItems}
        handleNavClick={handleNavClick}
        isVisible={isVisible}
      />

      <DesktopNav
        activeNav={activeNav}
        navItems={navItems}
        handleNavClick={handleNavClick}
        isVisible={isVisible}
      />
    </>
  );
}
