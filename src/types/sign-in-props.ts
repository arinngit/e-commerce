export interface AuthFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string;
  isLoading: boolean;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export interface AuthNavProps {
  activeNav: string;
  navItems: { id: string; label: string }[];
  handleNavClick: (id: string) => void;
}