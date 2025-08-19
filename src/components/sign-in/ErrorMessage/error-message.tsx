"use client";

interface ErrorMessageProps {
  error: string;
  isVisible: boolean;
}

export default function ErrorMessage({ error, isVisible }: ErrorMessageProps) {
  if (!error) return null;

  return (
    <div 
      className={`mb-4 md:mb-6 p-3 md:p-4 bg-red-500/10 border border-red-500/20 rounded-lg transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-2 opacity-0 scale-95'
      }`}
    >
      <p className="text-red-400 text-sm text-center font-satoshi">
        {error}
      </p>
    </div>
  );
}