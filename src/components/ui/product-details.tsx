"use client";

import { Star } from "lucide-react";
import { Product } from "@/types/product";

export default function ProductDetails({ product }: { product: Product }) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-4 h-4">
          <Star className="w-4 h-4 text-gray-300 absolute" />
          <div className="overflow-hidden w-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-100 rounded-2xl aspect-square overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.productName}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.productName}</h1>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">{renderStars(4.5)}</div>
            </div>

            <div className="text-2xl font-bold">${product.productPrice}</div>

            <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
