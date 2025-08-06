'use client'

import { Star, MoreHorizontal, CheckCircle, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Reviews() {
  const [activeTab, setActiveTab] = useState("Rating & Reviews");
  const [sortBy, setSortBy] = useState("Latest");

  const reviews = [
    {
      id: 1,
      name: "Samantha D.",
      verified: true,
      rating: 4.5,
      text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
      date: "August 14, 2023"
    },
    {
      id: 2,
      name: "Alex M.",
      verified: true,
      rating: 4,
      text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
      date: "August 15, 2023"
    },
    {
      id: 3,
      name: "Ethan R.",
      verified: true,
      rating: 3.5,
      text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
      date: "August 16, 2023"
    },
    {
      id: 4,
      name: "Olivia P.",
      verified: true,
      rating: 4,
      text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
      date: "August 17, 2023"
    },
    {
      id: 5,
      name: "Liam K.",
      verified: true,
      rating: 4,
      text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
      date: "August 18, 2023"
    },
    {
      id: 6,
      name: "Ava H.",
      verified: true,
      rating: 4.5,
      text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
      date: "August 19, 2023"
    }
  ];

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
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex justify-center mb-6 sm:mb-10">
        <div className="flex space-x-6 sm:space-x-12">
          <p className="font-satoshi text-lg sm:text-xl">Rating & Reviews</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 ml-0 sm:ml-2 gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-satoshi font-bold text-black">All Reviews</h2>
          <span className="text-gray-500 font-satoshi">({reviews.length})</span>
        </div>

        <div className="flex items-center justify-between sm:justify-normal gap-2 sm:gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg hidden sm:block">
            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="relative flex-1 sm:flex-none">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border font-satoshi border-gray-300 rounded-lg px-3 sm:px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full sm:w-auto"
            >
              <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>
              <option value="Highest Rating">Highest Rating</option>
              <option value="Lowest Rating">Lowest Rating</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <button className="bg-black font-satoshi text-white px-4 sm:px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base">
            Write a Review
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {reviews.map((review) => (
          <div key={review.id} className="border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="flex font-satoshi items-center gap-1">
                {renderStars(review.rating)}
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="font-satoshi font-semibold text-black text-sm sm:text-base">{review.name}</span>
              {review.verified && (
                <CheckCircle className="w-4 h-4 text-green-500" />
              )}
            </div>

            <p className="text-gray-600 mb-3 sm:mb-4 font-satoshi leading-relaxed text-sm sm:text-base">
              "{review.text}"
            </p>

            <div className="text-gray-500 font-satoshi text-xs sm:text-sm">
              Posted on {review.date}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button className="border border-gray-300 text-black px-6 sm:px-8 py-2 sm:py-3 rounded-full font-satoshi font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base">
          Load More Reviews
        </button>
      </div>
    </div>
  );
}