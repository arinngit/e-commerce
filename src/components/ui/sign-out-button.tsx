// components/ui/sign-out-button.tsx
"use client";

import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../../store/auth';
import { authService } from '../../../services/auth';
import { LogOut } from 'lucide-react';

export default function SignOutButton() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const accessToken = useAuthStore((state) => state.accessToken);

  const handleLogout = async () => {
    try {
      if (!accessToken) {
        throw new Error('No access token available');
      }
      
      await authService.logout(accessToken);
      logout();
      router.push('/auth/sign-in');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
      logout();
      router.push('/auth/sign-in');
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="p-2 hover:bg-gray-100 rounded-full"
      aria-label="Sign out"
    >
      <LogOut className="w-6 h-6 text-gray-700" />
    </button>
  );
}