"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "../../../../store/carts"

export default function CartIndicator() {
  const items = useCartStore((state) => state.items);
  
  return (
    <Link href="/cart" className="relative">
      <ShoppingBag className="w-6 h-6" />
      {items.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {items.length}
        </span>
      )}
    </Link>
  );
}