"use client";

import { useEffect } from "react";
import { useProductsStore } from "../store/products";

export function ProductsLoader() {
  const { fetchProducts } = useProductsStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return null;
}