"use client";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../app/api/products";
import { Skeleton } from "../ui/skeleton";
import { Product } from "@/types/product";
import { useState } from "react";
import Link from "next/link";

export default function MaybeLike() {
    const [showAll, setShowAll] = useState(false);
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });

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

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-center text-black mb-12">
            LOADING
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="group cursor-pointer">
                <Skeleton className="bg-gray-200 rounded-2xl aspect-square mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-6 w-1/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-center text-black mb-12">
            YOU MIGHT ALSO LIKE
          </h2>
          <div className="text-center text-red-500 py-8">
            Failed to load products. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  const displayedProducts = showAll ? products : products?.slice(0, 4);

  return (
    <section id="arrivals" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-sans font-bold text-center text-black mb-12">
          YOU MIGHT ALSO LIKE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayedProducts?.map((product: Product) => (
            <Link key={product.id} href={`/products/${product.id}`} passHref>
              <div className="group cursor-pointer">
                <div className="bg-gray-100 rounded-2xl aspect-square mb-4 overflow-hidden relative">
                  <img
                    src={product.photoUrl}
                    alt={product.name}
                    className="w-full h-full object-cover object-center rounded-2xl transform transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  {!product.photoUrl && (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No image</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="font-satoshi font-black text-lg text-black group-hover:text-gray-600 transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars(4.5)}{" "}
                    </div>
                    <span className="text-sm text-gray-600"></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xl font-satoshi font-bold text-black">
                      ${product.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}