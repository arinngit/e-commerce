"use client";

import { ChevronLeft, ChevronRight, Check, X, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/auth";

interface Review {
  id: number;
  userId: number;
  userName: string;
  rating: number;
  reviewText: string;
  createdAt: string;
}

const renderStars = (rating: number) =>
  Array.from({ length: 5 }, (_, i) => (
    <span
      key={i}
      className={`text-3xl ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
    >
      ★
    </span>
  ));

export default function HappyCustomers() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const t2 = useTranslations("review");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("customers");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    userName: "",
    rating: 0,
    reviewText: "",
  });
  const [hoverRating, setHoverRating] = useState(0);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "http://localhost:5155/SiteRatings/GetAll"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
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

  const handleStarClick = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };

  const handleStarHover = (rating: number) => {
    setHoverRating(rating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleOpenModal = () => {
    if (!accessToken) {
      setError("Please login to write a review");
      return;
    }
    setIsModalOpen(true);
  };

  const handleSubmitReview = async () => {
    try {
      const response = await fetch("http://localhost:5155/SiteRatings/Add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          userName: newReview.userName,
          rating: newReview.rating,
          reviewText: newReview.reviewText,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit review");
      }

      const fetchResponse = await fetch(
        `http://localhost:5155/SiteRatings/GetAll`
      );
      const data = await fetchResponse.json();
      setReviews(data);

      setNewReview({ rating: 0, userName: "", reviewText: "" });
      setIsModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    }
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => {
        const ratingValue = i + 1;
        return (
          <Star
            key={i}
            className={`w-4 h-4 ${
              ratingValue <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        );
      });
  };

  const renderRatingStars = (rating: number, isInteractive = false) => {
    return Array(5)
      .fill(0)
      .map((_, i) => {
        const ratingValue = i + 1;
        return (
          <Star
            key={i}
            className={`w-6 h-6 ${isInteractive ? "cursor-pointer" : ""} ${
              ratingValue <= (hoverRating || rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
            onClick={
              isInteractive ? () => handleStarClick(ratingValue) : undefined
            }
            onMouseEnter={
              isInteractive ? () => handleStarHover(ratingValue) : undefined
            }
            onMouseLeave={isInteractive ? handleStarLeave : undefined}
          />
        );
      });
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
      <section className="max-w-7xl flex flex-col items-center justify-center mx-auto gap-6 px-2 py-12">
        <div className="flex-1 text-center">{t("no_review")}</div>
        <button
          onClick={handleOpenModal}
          className="bg-black text-white font-satoshi px-6 py-2 rounded-full hover:bg-gray-800"
        >
          Write Review
        </button>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-satoshi">{t2("writeReview")}</h3>
                <button onClick={() => setIsModalOpen(false)}>
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="mb-4">
                <label className="block font-satoshi font-medium mb-2">
                  {t2("modal.yourName")}
                </label>
                <input
                  type="text"
                  name="userName"
                  value={newReview.userName}
                  onChange={(e) =>
                    setNewReview({ ...newReview, userName: e.target.value })
                  }
                  className="border-2 mb-2 pt-2 pb-2 font-satoshi pl-2"
                />

                <label className="block font-satoshi font-medium mb-2">
                  {t2("modal.yourRating")}
                </label>
                <div className="flex">
                  {renderRatingStars(newReview.rating, true)}
                </div>
              </div>

              <div className="mb-6">
                <label className="block font-satoshi font-medium mb-2">
                  {t2("modal.yourReview")}
                </label>
                <textarea
                  value={newReview.reviewText}
                  onChange={(e) =>
                    setNewReview({ ...newReview, reviewText: e.target.value })
                  }
                  className="w-full p-3 border font-satoshi rounded-lg focus:ring-2 focus:ring-black"
                  placeholder={t2("modal.reviewPlaceholder")}
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg font-satoshi hover:bg-gray-50"
                >
                  {t2("modal.cancel")}
                </button>
                <button
                  onClick={handleSubmitReview}
                  disabled={!newReview.rating || !newReview.reviewText}
                  className="px-4 py-2 bg-black font-satoshi text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
                >
                  {t2("modal.submit")}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{t("writeReview")}</h3>
                <button onClick={() => setIsModalOpen(false)}>
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="mb-4">
                <label className="block font-medium mb-2">
                  {t2("modal.yourName")}
                </label>
                <input
                  type="text"
                  name="userName"
                  value={newReview.userName}
                  onChange={(e) =>
                    setNewReview({ ...newReview, userName: e.target.value })
                  }
                  className="border-2 mb-2 pt-2 pb-2 font-satoshi pl-2"
                />

                <label className="block font-medium mb-2">
                  {t2("modal.yourRating")}
                </label>
                <div className="flex">
                  {renderRatingStars(newReview.rating, true)}
                </div>
              </div>

              <div className="mb-6">
                <label className="block font-medium mb-2">
                  {t2("modal.yourReview")}
                </label>
                <textarea
                  value={newReview.reviewText}
                  onChange={(e) =>
                    setNewReview({ ...newReview, reviewText: e.target.value })
                  }
                  className="w-full p-3 border font-satoshi rounded-lg focus:ring-2 focus:ring-black"
                  placeholder={t2("modal.reviewPlaceholder")}
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  {t2("modal.cancel")}
                </button>
                <button
                  onClick={handleSubmitReview}
                  disabled={!newReview.rating || !newReview.reviewText}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
                >
                  {t2("modal.submit")}
                </button>
              </div>
            </div>
          </div>
        )}
        <h2 className="text-4xl font-bold text-black">{t("our_customers")}</h2>
        <button
          onClick={handleOpenModal}
          className="bg-black text-white font-satoshi px-6 py-2 rounded-full hover:bg-gray-800"
        >
          Write Review
        </button>
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
