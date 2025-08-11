'use client'

import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

const renderStars = (rating: number) =>
  Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={`text-3xl ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>
      ★
    </span>
  ));

export default function HappyCustomers() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("customers");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:5155/SiteRatings/GetAll');
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center">Loading reviews...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center text-red-500">Error: {error}</div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center">{t("no_review")}</div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-black">{t("our_customers")}</h2>
        {reviews.length > 1 && (
          <div className="flex gap-2">
            <button
              onClick={prevReview}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={nextReview}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
      </div>

      <div className="sm:hidden relative overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="w-full flex-shrink-0 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex mb-4">{renderStars(review.rating)}</div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-sans text-lg text-black">
                  {review.userName || `User ${review.userId}`}
                </h3>
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed font-satoshi font-regular">
                {review.reviewText}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex mb-4">{renderStars(review.rating)}</div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-sans text-lg text-black">
                {review.userName || `User ${review.userId}`}
              </h3>
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed font-satoshi font-regular">
              {review.reviewText}
            </p>
          </div>
        ))}
      </div>

      {reviews.length > 1 && (
        <div className="sm:hidden flex justify-center gap-2 mt-6">
          {reviews.map((review, index) => (
            <button
              key={review.id}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-black" : "bg-gray-300"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}