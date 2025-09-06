"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../../store/carts";

interface FormData {
  country: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  apartment: string;
  postalCode: string;
  city: string;
  phone: string;
}

interface SavedFormData {
  email: string;
  formData: FormData;
  saveInfo: boolean;
}

interface DeliveryOption {
  id: string;
  type: "standard" | "express";
  name: string;
  description: string;
  price: number;
  minDays: number;
  maxDays: number;
  guaranteed?: boolean;
}

interface ShippingZone {
  countries: string[];
  zone: string;
  standardDays: { min: number; max: number };
  expressDays: { min: number; max: number };
  standardPrice: number;
  expressPrice: number;
}

const shippingZones: ShippingZone[] = [
  {
    countries: ["us", "ca"],
    zone: "North America",
    standardDays: { min: 5, max: 10 },
    expressDays: { min: 2, max: 4 },
    standardPrice: 15,
    expressPrice: 35,
  },
  {
    countries: ["gb", "de", "fr", "it", "es"],
    zone: "Western Europe",
    standardDays: { min: 7, max: 14 },
    expressDays: { min: 3, max: 6 },
    standardPrice: 20,
    expressPrice: 45,
  },
  {
    countries: ["jp", "kr"],
    zone: "East Asia",
    standardDays: { min: 14, max: 21 },
    expressDays: { min: 7, max: 10 },
    standardPrice: 35,
    expressPrice: 65,
  },
  {
    countries: ["cn", "in"],
    zone: "Asia",
    standardDays: { min: 10, max: 18 },
    expressDays: { min: 5, max: 8 },
    standardPrice: 25,
    expressPrice: 50,
  },
  {
    countries: ["au"],
    zone: "Oceania",
    standardDays: { min: 12, max: 20 },
    expressDays: { min: 6, max: 9 },
    standardPrice: 30,
    expressPrice: 60,
  },
  {
    countries: ["br", "mx"],
    zone: "Latin America",
    standardDays: { min: 15, max: 25 },
    expressDays: { min: 8, max: 12 },
    standardPrice: 40,
    expressPrice: 70,
  },
  {
    countries: ["az", "tr", "ru"],
    zone: "Eastern Europe & Central Asia",
    standardDays: { min: 10, max: 16 },
    expressDays: { min: 5, max: 8 },
    standardPrice: 25,
    expressPrice: 50,
  },
  {
    countries: ["sa", "ae", "ir"],
    zone: "Middle East",
    standardDays: { min: 8, max: 15 },
    expressDays: { min: 4, max: 7 },
    standardPrice: 25,
    expressPrice: 45,
  },
  {
    countries: ["eg", "za", "pk"],
    zone: "Africa & South Asia",
    standardDays: { min: 12, max: 22 },
    expressDays: { min: 6, max: 10 },
    standardPrice: 30,
    expressPrice: 55,
  },
];

export default function ShippingPage() {
  const [formData, setFormData] = useState<FormData>({
    country: "",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    postalCode: "",
    city: "",
    phone: "",
  });

  const [email, setEmail] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState("");
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);
  const [estimatedDates, setEstimatedDates] = useState<{
    standard: string[];
    express: string[];
  }>({
    standard: [],
    express: [],
  });

  const router = useRouter();
  const { items, updateQuantity, removeItem } = useCartStore();

  useEffect(() => {
    const savedData = localStorage.getItem("shippingInfo");
    if (savedData) {
      try {
        const parsedData: SavedFormData = JSON.parse(savedData);
        setEmail(parsedData.email);
        setFormData(parsedData.formData);
      } catch (error) {
        console.error("Error parsing saved shipping data:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (formData.country) {
      calculateDeliveryOptions(formData.country);
    }
  }, [formData.country]);

  const calculateDeliveryOptions = (countryCode: string) => {
    const zone = shippingZones.find((z) => z.countries.includes(countryCode));

    if (!zone) {
      const defaultOptions: DeliveryOption[] = [
        {
          id: "standard",
          type: "standard",
          name: "Standard Shipping",
          description: "15-30 Business Days",
          price: 25,
          minDays: 15,
          maxDays: 30,
        },
        {
          id: "express",
          type: "express",
          name: "Express Shipping",
          description: "7-14 Business Days",
          price: 50,
          minDays: 7,
          maxDays: 14,
        },
      ];
      setDeliveryOptions(defaultOptions);
      calculateEstimatedDates(15, 30, 7, 14);
      return;
    }

    const options: DeliveryOption[] = [
      {
        id: "standard",
        type: "standard",
        name: "Standard Shipping",
        description: `${zone.standardDays.min}-${zone.standardDays.max} Business Days`,
        price: zone.standardPrice,
        minDays: zone.standardDays.min,
        maxDays: zone.standardDays.max,
      },
      {
        id: "express",
        type: "express",
        name: "Express Shipping",
        description: `${zone.expressDays.min}-${zone.expressDays.max} Business Days`,
        price: zone.expressPrice,
        minDays: zone.expressDays.min,
        maxDays: zone.expressDays.max,
      },
    ];

    setDeliveryOptions(options);
    calculateEstimatedDates(
      zone.standardDays.min,
      zone.standardDays.max,
      zone.expressDays.min,
      zone.expressDays.max
    );
  };

  const calculateEstimatedDates = (
    stdMin: number,
    stdMax: number,
    expMin: number,
    expMax: number
  ) => {
    const today = new Date();
    const standardDates: string[] = [];
    const expressDates: string[] = [];

    [stdMin, stdMax].forEach((days) => {
      const date = addBusinessDays(today, days);
      standardDates.push(
        date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
      );
    });

    [expMin, expMax].forEach((days) => {
      const date = addBusinessDays(today, days);
      expressDates.push(
        date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
      );
    });

    setEstimatedDates({ standard: standardDates, express: expressDates });
  };

  const addBusinessDays = (startDate: Date, businessDays: number): Date => {
    const date = new Date(startDate);
    let daysAdded = 0;

    while (daysAdded < businessDays) {
      date.setDate(date.getDate() + 1);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        daysAdded++;
      }
    }

    return date;
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const selectedOption = deliveryOptions.find(
    (opt) => opt.id === selectedDelivery
  );
  const shippingCost = selectedOption ? selectedOption.price : 0;
  const total = subtotal + tax + shippingCost;

  const updateItemQuantity = (id: number, delta: number) => {
    updateQuantity(id, delta);
  };

  const removeCartItem = (id: number) => {
    removeItem(id);
  };

  const handleContinue = () => {
    if (selectedDelivery) {
      router.push("/payment");
    }
  };

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.address &&
    formData.city &&
    formData.postalCode &&
    email &&
    selectedDelivery;

  return (
    <div className="min-h-screen bg-gray-50 font-satoshi">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-sans">ShopCo</h1>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-400 space-x-2">
            <span>Cart</span>
            <span>/</span>
            <span>Info</span>
            <span>/</span>
            <span className="text-black font-medium">Shipping</span>
            <span>/</span>
            <span>Payment</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="pr-8">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Contact</h2>
                <button
                  className="text-sm text-gray-500 hover:text-gray-700"
                  onClick={() => router.push("/info")}
                >
                  Change
                </button>
              </div>
              <div className="p-4 bg-gray-100 rounded-md text-sm text-gray-700">
                {email || "No email provided"}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Ship To</h2>
                <button
                  className="text-sm text-gray-500 hover:text-gray-700"
                  onClick={() => router.push("/info")}
                >
                  Change
                </button>
              </div>
              <div className="p-4 bg-gray-100 rounded-md text-sm text-gray-700">
                <p>
                  {formData.firstName} {formData.lastName}
                </p>
                <p>
                  {formData.address}
                  {formData.apartment && `, ${formData.apartment}`}
                </p>
                <p>
                  {formData.city}, {formData.postalCode}
                </p>
                <p>{formData.country || "No country selected"}</p>
                <p className="mt-2">{formData.phone}</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-6">Delivery Options</h2>

              {deliveryOptions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Please select a country in your shipping address to see
                  delivery options.
                </div>
              ) : (
                <div className="space-y-4">
                  {deliveryOptions.map((option) => (
                    <div key={option.id} className="border rounded-lg p-4">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="delivery"
                            value={option.id}
                            checked={selectedDelivery === option.id}
                            onChange={(e) =>
                              setSelectedDelivery(e.target.value)
                            }
                            className="text-green-600 focus:ring-green-500"
                          />
                          <div>
                            <h3 className="font-medium">{option.name}</h3>
                            <p className="text-sm text-gray-600">
                              {option.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold">
                            {option.price === 0
                              ? "Free"
                              : `$${option.price.toFixed(2)}`}
                          </span>
                        </div>
                      </label>

                      {selectedDelivery === option.id && (
                        <div className="mt-4 pl-6 border-l-2 border-green-200">
                          <p className="text-sm font-medium mb-2 text-green-700">
                            Estimated Delivery Dates:
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            {(option.type === "standard"
                              ? estimatedDates.standard
                              : estimatedDates.express
                            ).map((date, index) => (
                              <div
                                key={index}
                                className="text-sm text-gray-600 bg-green-50 p-2 rounded"
                              >
                                {index === 0 ? "Earliest: " : "Latest: "}
                                {date}
                              </div>
                            ))}
                          </div>
                          {option.type === "express" && (
                            <div className="mt-2 text-xs text-green-600 bg-green-50 p-2 rounded">
                              ⚡ Priority handling and faster customs clearance
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {formData.country && (
                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                  <div className="flex items-start space-x-2">
                    <svg
                      className="w-5 h-5 text-blue-500 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-blue-800">
                        Shipping Information
                      </p>
                      <p className="text-sm text-blue-700">
                        Delivery times are calculated based on business days and
                        may vary due to customs processing, local holidays, or
                        weather conditions.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => router.push("/checkout")}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
                <span>Return To Information</span>
              </button>

              <button
                onClick={handleContinue}
                disabled={!isFormValid}
                className={`px-8 py-3 rounded-md font-medium ${
                  isFormValid
                    ? "bg-green-700 text-white hover:bg-green-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Continue To Payment
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Your Cart</h2>

            {items.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 relative"
                    >
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-20 object-cover rounded-md"
                        />
                        <div className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {item.quantity}
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          Size: {item.size}
                        </p>
                        <p className="text-sm text-gray-600">
                          Color: {item.color}
                        </p>

                        <div className="flex items-center space-x-3 mt-2">
                          <button
                            onClick={() => updateItemQuantity(item.id, -1)}
                            className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            −
                          </button>
                          <span className="text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateItemQuantity(item.id, 1)}
                            className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold">${item.price}</p>
                      </div>

                      <button
                        onClick={() => removeCartItem(item.id)}
                        className="absolute top-0 right-0 text-gray-400 hover:text-gray-600"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                <hr className="my-6" />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({items.length} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shippingCost === 0
                        ? "Free"
                        : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>

                  {selectedOption && (
                    <div className="text-xs text-gray-500">
                      {selectedOption.name} ({selectedOption.description})
                    </div>
                  )}

                  <hr className="my-3" />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Orders:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  The total amount you pay includes all applicable customs
                  duties & taxes. We guarantee no additional charges on
                  delivery.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
