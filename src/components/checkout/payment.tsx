"use client";
import { useState, useEffect } from "react";

interface ShippingFormData {
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

interface ShippingInfo {
  email: string;
  formData: ShippingFormData;
  saveInfo: boolean;
}

export default function PaymentPage() {
  const [useAlternativeAddress, setUseAlternativeAddress] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    addressLine1: "",
    addressLine2: "",
    citySuburb: "",
    zipPostcode: "",
    phone: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    securityCode: "",
  });

  useEffect(() => {
    // Получаем данные из localStorage
    const savedShippingInfo = localStorage.getItem("shippingInfo");
    if (savedShippingInfo) {
      try {
        const parsedInfo = JSON.parse(savedShippingInfo) as ShippingInfo;
        setShippingInfo(parsedInfo);

        // Заполняем форму данными из localStorage если выбран дефолтный адрес
        if (!useAlternativeAddress) {
          setFormData((prev) => ({
            ...prev,
            name: `${parsedInfo.formData.firstName} ${parsedInfo.formData.lastName}`,
            email: parsedInfo.email,
            country: parsedInfo.formData.country,
            addressLine1: parsedInfo.formData.address,
            addressLine2: parsedInfo.formData.apartment,
            citySuburb: parsedInfo.formData.city,
            zipPostcode: parsedInfo.formData.postalCode,
            phone: parsedInfo.formData.phone,
          }));
        }
      } catch (error) {
        console.error("Error parsing shipping info:", error);
      }
    }
  }, [useAlternativeAddress]);

  useEffect(() => {
    // Проверяем, заполнены ли все поля карты
    const isCardComplete =
      formData.cardNumber.replace(/\s/g, "").length >= 16 &&
      formData.expiryMonth !== "" &&
      formData.expiryYear !== "" &&
      formData.securityCode.length === 3;

    setIsFormComplete(isCardComplete);
  }, [formData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "securityCode") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 3) {
        setFormData((prev) => ({
          ...prev,
          [name]: numericValue,
        }));
      }
      return;
    }

    if (name === "cardNumber") {
      // Форматирование номера карты с пробелами
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      if (formattedValue.length <= 19) {
        // 16 цифр + 3 пробела
        setFormData((prev) => ({
          ...prev,
          [name]: formattedValue,
        }));
      }
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  const handleAddressToggle = (useAlt: boolean) => {
    setUseAlternativeAddress(useAlt);

    if (!useAlt && shippingInfo) {
      // Заполняем форму данными из localStorage
      setFormData((prev) => ({
        ...prev,
        name: `${shippingInfo.formData.firstName} ${shippingInfo.formData.lastName}`,
        email: shippingInfo.email,
        country: shippingInfo.formData.country,
        addressLine1: shippingInfo.formData.address,
        addressLine2: shippingInfo.formData.apartment,
        citySuburb: shippingInfo.formData.city,
        zipPostcode: shippingInfo.formData.postalCode,
        phone: shippingInfo.formData.phone,
      }));
    } else {
      // Очищаем поля адреса
      setFormData((prev) => ({
        ...prev,
        name: "",
        email: "",
        country: "",
        addressLine1: "",
        addressLine2: "",
        citySuburb: "",
        zipPostcode: "",
        phone: "",
      }));
    }
  };

  const isAddressFieldDisabled = !useAlternativeAddress;

  return (
    <div className="min-h-screen bg-gray-50 py-8 font-satoshi">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-sans mb-6">
            shopco
          </h1>

          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <span>Cart</span>
            <span>/</span>
            <span>Info</span>
            <span>/</span>
            <span>Shipping</span>
            <span>/</span>
            <span className="text-black font-medium">Payment</span>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-lg font-medium mb-6">Billing Address</h2>

              <div className="space-y-3 mb-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={!useAlternativeAddress}
                    onChange={() => handleAddressToggle(false)}
                    className="w-4 h-4 text-green-600"
                  />
                  <span className="text-sm">
                    Default (Same As Billing Address)
                  </span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={useAlternativeAddress}
                    onChange={() => handleAddressToggle(true)}
                    className="w-4 h-4 text-green-600"
                  />
                  <span className="text-sm">
                    Add An Alternative Delivery Address
                  </span>
                </label>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isAddressFieldDisabled}
                    className={`w-full px-3 py-3 border border-gray-300 focus:outline-none focus:border-gray-500 pl-10 ${
                      isAddressFieldDisabled ? "bg-gray-100 text-gray-500" : ""
                    }`}
                    placeholder="Name"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isAddressFieldDisabled}
                    className={`w-full px-3 py-3 border border-gray-300 focus:outline-none focus:border-gray-500 pl-10 ${
                      isAddressFieldDisabled ? "bg-gray-100 text-gray-500" : ""
                    }`}
                    placeholder="Email"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    disabled={isAddressFieldDisabled}
                    className={`w-full px-3 py-3 border border-gray-300 focus:outline-none focus:border-gray-500 pl-10 ${
                      isAddressFieldDisabled ? "bg-gray-100 text-gray-500" : ""
                    }`}
                    placeholder="Country"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    disabled={isAddressFieldDisabled}
                    className={`w-full px-3 py-3 border border-gray-300 focus:outline-none focus:border-gray-500 pl-10 ${
                      isAddressFieldDisabled ? "bg-gray-100 text-gray-500" : ""
                    }`}
                    placeholder="Address Line1"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    disabled={isAddressFieldDisabled}
                    className={`w-full px-3 py-3 border border-gray-300 focus:outline-none focus:border-gray-500 pl-10 ${
                      isAddressFieldDisabled ? "bg-gray-100 text-gray-500" : ""
                    }`}
                    placeholder="Address Line2"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="citySuburb"
                    value={formData.citySuburb}
                    onChange={handleInputChange}
                    disabled={isAddressFieldDisabled}
                    className={`w-full px-3 py-3 border border-gray-300 focus:outline-none focus:border-gray-500 pl-10 ${
                      isAddressFieldDisabled ? "bg-gray-100 text-gray-500" : ""
                    }`}
                    placeholder="City / Suburb"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 5a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="zipPostcode"
                    value={formData.zipPostcode}
                    onChange={handleInputChange}
                    disabled={isAddressFieldDisabled}
                    className={`w-full px-3 py-3 border border-gray-300 focus:outline-none focus:border-gray-500 pl-10 ${
                      isAddressFieldDisabled ? "bg-gray-100 text-gray-500" : ""
                    }`}
                    placeholder="Zip / Postcode"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 极4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isAddressFieldDisabled}
                    className={`w-full px-3 py-3 border border-gray-300 focus:outline-none focus:border-gray-500 pl-10 ${
                      isAddressFieldDisabled ? "bg-gray-100 text-gray-500" : ""
                    }`}
                    placeholder="Phone"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="currentColor"
                      viewBox="极0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 极006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-6">Payment</h2>

              <p className="text-sm text-gray-600 mb-6">
                Please Choose Your Payment Method
              </p>

              <div className="flex space-x-4 mb-8">
                <div className="text-white px-2 py-1 text-xs rounded flex items-center justify-center h-10 w-20">
                  <img
                    src="/amex.svg"
                    alt="American Express"
                    className="h-6 w-full object-contain"
                  />
                </div>
                <div className="text-white px-2 py-1 text-xs rounded font-bold flex items-center justify-center h-10 w-20">
                  <img
                    src="/visa.svg"
                    alt="Visa"
                    className="h-6 w-full object-contain"
                  />
                </div>
                <div className="bg-gray-100 px极2 py-1 rounded flex items-center justify-center h-10 w-20">
                  <img
                    src="/master.svg"
                    alt="Mastercard"
                    className="h-6 w-full object-contain"
                  />
                </div>
                <div className="text-white px-2 py-1 text-xs rounded flex items-center justify-center h-10 w-20">
                  <img
                    src="/paypal.svg"
                    alt="PayPal"
                    className="h-6 w-full object-contain"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number*
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 focus:outline-none focus:border-gray-500"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font极medium text-gray-700 mb-2">
                      Expiry Date*
                    </label>
                    <div className="grid grid-cols-2极 gap-2">
                      <select
                        name="expiryMonth"
                        value={formData.expiryMonth}
                        onChange={handleInputChange}
                        className="px-3 py-3 border border-gray-300 focus:outline-none focus:border-gray-500"
                      >
                        <option value="">Month</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option
                            key={i + 1}
                            value={String(i + 1).padStart(2, "0")}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                      <select
                        name="expiryYear"
                        value={formData.expiryYear}
                        onChange={handleInputChange}
                        className="px-3 py-3 border border-gray-300 focus:outline-none focus:极border-gray-500"
                      >
                        <option value="">Year</option>
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={i} value={2024 + i}>
                            {2024 + i}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Security Code*
                      </label>
                      <div className="relative group">
                        <svg
                          className="w-4 h-4 text-gray-400 cursor-help"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 极0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1极h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="absolute bottom-6 left-0 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          What Is This?
                        </div>
                      </div>
                    </div>
                    <input
                      type="password"
                      name="securityCode"
                      value={formData.securityCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 focus:outline-none focus:border-gray-500"
                      placeholder="•••"
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isFormComplete}
                className={`w-full py-4 px-6 mt-8 transition-colors duration-200 ${
                  isFormComplete
                    ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Pay And Place Order
              </button>

              <div className="text-xs text-gray-500 mt-4 leading-relaxed">
                By Clicking On 'pay And Place Order' You Agree (I) To Make Your
                Purchase From Global -E As Merchant Of Record For This
                Transaction, Subject To Global-E's{" "}
                <a href="#" className="underline">
                  Terms Of Sale
                </a>
                ;(II) That Your Information Will Be Handled By Global-E In
                Accordance With The Global-E{" "}
                <a href="#" className="underline">
                  Privacy Policy
                </a>{" "}
                And (III) That Global-E Will Share Your Information (Excluding
                The Payment Details)With Modimal.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
