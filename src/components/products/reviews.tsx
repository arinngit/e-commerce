"use client";

import {
  Star,
  MoreHorizontal,
  CheckCircle,
  SlidersHorizontal,
  ChevronDown,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useAuthStore } from "../../../store/auth";

interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  rating: number;
  reviewText: string;
  createdAt: string;
}

export default function Reviews({ productId }: { productId: number }) {
  const t = useTranslations("reviews");
  const t2 = useTranslations("review");
  const [sortBy, setSortBy] = useState(t("sortOptions.latest"));
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
          `http://localhost:5155/ProductRatings/GetAll?productId=${productId}`
        );
        if (!response.ok) throw new Error("Failed to fetch reviews");
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

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
      const response = await fetch("http://localhost:5155/ProductRatings/Add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          productId,
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
        `http://localhost:5155/ProductRatings/GetAll?productId=${productId}`
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="text-center">{t("loading")}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
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

      <div className="flex justify-center mb-6 sm:mb-10">
        <div className="flex space-x-6 sm:space-x-12">
          <p className="text-lg sm:text-xl font-satoshi font-medium">
            {t("title")}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-satoshi font-bold">
            {t("allReviews")}
          </h2>
          <span className="text-gray-500 font-satoshi">({reviews.length})</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border font-satoshi rounded-lg px-4 py-2 pr-8 focus:outline-none"
            >
              <option value={t("sortOptions.latest")}>
                {t("sortOptions.latest")}
              </option>
              <option value={t("sortOptions.oldest")}>
                {t("sortOptions.oldest")}
              </option>
              <option value={t("sortOptions.highest")}>
                {t("sortOptions.highest")}
              </option>
              <option value={t("sortOptions.lowest")}>
                {t("sortOptions.lowest")}
              </option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          <button
            onClick={handleOpenModal}
            className="bg-black text-white font-satoshi px-6 py-2 rounded-full hover:bg-gray-800"
          >
            {t("writeReview")}
          </button>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-8 font-satoshi">
          <p className="text-gray-500 mb-4 font-satoshi">{t("noReviews")}</p>
          <button
            onClick={handleOpenModal}
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800"
          >
            {t("writeReview")}
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-6 mb-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between mb-4 font-satoshi">
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="font-sans">{review.userName}</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>

                <p className="text-gray-600 mb-4 font-satoshi">
                  "{review.reviewText}"
                </p>

                <div className="text-gray-500 text-sm font-satoshi">
                  {t("postedOn", { date: formatDate(review.createdAt) })}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center font-satoshi">
            <button className="border px-8 py-3 rounded-full hover:bg-gray-50">
              {t("loadMore")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
