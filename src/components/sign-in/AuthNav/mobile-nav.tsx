import { AuthNavProps } from "@/types/sign-in-props";

export default function MobileNav({
  activeNav,
  navItems,
  handleNavClick,
  isVisible
}: AuthNavProps & { isVisible: boolean }) {
  return (
    <div className={`md:hidden flex justify-center space-x-2 py-4 border-b border-gray-700/30 transform transition-all duration-800 ease-out ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
    }`}>
      {navItems.map((item, index) => (
        <button
          key={item.id}
          onClick={() => handleNavClick(item.id)}
          className={`relative px-3 py-1 text-xs font-satoshi transition-all duration-500 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          } ${
            activeNav === item.id ? "text-red-500" : "text-white hover:text-red-200"
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          {item.label}
          {activeNav === item.id && (
            <div className="absolute inset-0 rounded border border-red-800 animate-pulse shadow-sm shadow-red-400/50"></div>
          )}
        </button>
      ))}
    </div>
  );
}