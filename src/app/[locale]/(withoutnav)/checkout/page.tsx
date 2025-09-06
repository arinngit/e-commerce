"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../../../../store/carts";
import { ShoppingBag, ChevronRight, Check, Home } from "lucide-react";
import Image from "next/image";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Info from "@/components/checkout/info";

export default function Checkout() {
  return (
    <div>
      <Info />
    </div>
  );
}
