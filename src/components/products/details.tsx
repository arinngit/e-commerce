'use client'
import { Star, ChevronRight, Plus, Minus, Check } from "lucide-react";
import { useState } from "react";

export default function Details() {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);

  const colors = [
    { name: "Olive", color: "bg-green-700", selected: true },
    { name: "Teal", color: "bg-teal-600", selected: false },
    { name: "Navy", color: "bg-blue-900", selected: false }
  ];

  const sizes = ["M", "L", "XL"];

  const thumbnails = [
    { id: 1, selected: true },
    { id: 2, selected: false },
    { id: 3, selected: false }
  ];

  const renderStars = (rating : number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-5 h-5">
          <Star className="w-5 h-5 text-gray-300 absolute" />
          <div className="overflow-hidden w-2.5">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <nav className="flex items-center space-x-2 text-gray-500 mb-8">
        <span className="hover:text-gray-700 cursor-pointer font-satoshi">Home</span>
        <ChevronRight className="w-4 h-4" />
        <span className="hover:text-gray-700 cursor-pointer font-satoshi">Shop</span>
        <ChevronRight className="w-4 h-4" />
        <span className="hover:text-gray-700 cursor-pointer font-satoshi">Men</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-black font-medium font-satoshi">T-shirts</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex-1 bg-gray-100 rounded-2xl aspect-square flex items-center justify-center">
            <div className="w-72 h-72 bg-green-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm opacity-50">T-shirt Image</span>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-satoshi font-black text-black">
            ONE LIFE GRAPHIC T-SHIRT
          </h1>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {renderStars(4.5)}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-satoshi font-bold text-black">$260</span>
          </div>

          <p className="text-gray-600 leading-relaxed font-satoshi">
            This graphic t-shirt which is perfect for any occasion. Crafted from a soft and 
            breathable fabric, it offers superior comfort and style.
          </p>

          <hr className="border-gray-200" />

          <div className="space-y-4">
            <h3 className="text-gray-600 font-satoshi">Select Colors</h3>
            <div className="flex gap-3">
              {colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`w-10 h-10 rounded-full ${color.color} flex items-center justify-center`}
                >
                  {selectedColor === index && (
                    <Check className="w-5 h-5 text-white" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          <div className="space-y-4">
            <h3 className="text-gray-600 font-satoshi">Choose Size</h3>
            <div className="flex gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-3 rounded-full font-satoshi border transition-colors ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'bg-gray-100 text-gray-700 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          <div className="flex gap-4">
            <div className="flex items-center bg-gray-100 rounded-full">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-gray-200 rounded-full"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="px-4 text-lg font-satoshi">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-gray-200 rounded-full"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <button className="flex-1 bg-black text-white py-4 px-8 rounded-full font-satoshi hover:bg-gray-800 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}