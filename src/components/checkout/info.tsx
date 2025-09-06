"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/auth";
import { useCartStore } from "../../../store/carts";
import "flag-icons/css/flag-icons.min.css";
import Select from "react-select";

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

interface Country {
  code: string;
  name: string;
  flagCode: string;
  phoneCode: string;
  regex: RegExp;
}

const countries: Country[] = [
  {
    code: "us",
    name: "United States",
    flagCode: "us",
    phoneCode: "+1",
    regex: /^\+1\s?\d{10}$/,
  },
  {
    code: "ca",
    name: "Canada",
    flagCode: "ca",
    phoneCode: "+1",
    regex: /^\+1\s?\d{10}$/,
  },
  {
    code: "gb",
    name: "United Kingdom",
    flagCode: "gb",
    phoneCode: "+44",
    regex: /^\+44\s?\d{10,11}$/,
  },
  {
    code: "au",
    name: "Australia",
    flagCode: "au",
    phoneCode: "+61",
    regex: /^\+61\s?\d{9}$/,
  },
  {
    code: "de",
    name: "Germany",
    flagCode: "de",
    phoneCode: "+49",
    regex: /^\+49\s?\d{10,12}$/,
  },
  {
    code: "fr",
    name: "France",
    flagCode: "fr",
    phoneCode: "+33",
    regex: /^\+33\s?\d{9}$/,
  },
  {
    code: "it",
    name: "Italy",
    flagCode: "it",
    phoneCode: "+39",
    regex: /^\+39\s?\d{9,10}$/,
  },
  {
    code: "es",
    name: "Spain",
    flagCode: "es",
    phoneCode: "+34",
    regex: /^\+34\s?\d{9}$/,
  },
  {
    code: "jp",
    name: "Japan",
    flagCode: "jp",
    phoneCode: "+81",
    regex: /^\+81\s?\d{10,11}$/,
  },
  {
    code: "cn",
    name: "China",
    flagCode: "cn",
    phoneCode: "+86",
    regex: /^\+86\s?\d{11}$/,
  },
  {
    code: "in",
    name: "India",
    flagCode: "in",
    phoneCode: "+91",
    regex: /^\+91\s?\d{10}$/,
  },
  {
    code: "br",
    name: "Brazil",
    flagCode: "br",
    phoneCode: "+55",
    regex: /^\+55\s?\d{10,11}$/,
  },
  {
    code: "ru",
    name: "Russia",
    flagCode: "ru",
    phoneCode: "+7",
    regex: /^\+7\s?\d{10}$/,
  },
  {
    code: "kr",
    name: "South Korea",
    flagCode: "kr",
    phoneCode: "+82",
    regex: /^\+82\s?\d{9,10}$/,
  },
  {
    code: "mx",
    name: "Mexico",
    flagCode: "mx",
    phoneCode: "+52",
    regex: /^\+52\s?\d{10}$/,
  },
  {
    code: "az",
    name: "Azerbaijan",
    flagCode: "az",
    phoneCode: "+994",
    regex: /^\+994\s?\d{9}$/,
  },
  {
    code: "tr",
    name: "Turkey",
    flagCode: "tr",
    phoneCode: "+90",
    regex: /^\+90\s?\d{10}$/,
  },
  {
    code: "sa",
    name: "Saudi Arabia",
    flagCode: "sa",
    phoneCode: "+966",
    regex: /^\+966\s?\d{8,9}$/,
  },
  {
    code: "ae",
    name: "United Arab Emirates",
    flagCode: "ae",
    phoneCode: "+971",
    regex: /^\+971\s?\d{8,9}$/,
  },
  {
    code: "ir",
    name: "Iran",
    flagCode: "ir",
    phoneCode: "+98",
    regex: /^\+98\s?\d{10}$/,
  },
  {
    code: "pk",
    name: "Pakistan",
    flagCode: "pk",
    phoneCode: "+92",
    regex: /^\+92\s?\d{10}$/,
  },
  {
    code: "eg",
    name: "Egypt",
    flagCode: "eg",
    phoneCode: "+20",
    regex: /^\+20\s?\d{9,10}$/,
  },
  {
    code: "za",
    name: "South Africa",
    flagCode: "za",
    phoneCode: "+27",
    regex: /^\+27\s?\d{9}$/,
  },
];

export default function Info() {
  const [email, setEmail] = useState("");
  const [emailOffers, setEmailOffers] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);
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

  const [phoneCode, setPhoneCode] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const options = countries.map((c) => ({
    value: c.code,
    label: c.name,
    flagCode: c.flagCode,
  }));

  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => !!state.accessToken);
  const { items, updateQuantity, removeItem } = useCartStore();

  const validatePhone = (phone: string, countryCode: string): boolean => {
    if (!phone || !countryCode) return false;

    const country = countries.find((c) => c.code === countryCode);
    if (!country) return false;

    return country.regex.test(phone);
  };

  useEffect(() => {
    const isPhoneValid = validatePhone(formData.phone, formData.country);

    if (formData.phone && formData.country && !isPhoneValid) {
      setPhoneError("Invalid phone number format");
    } else {
      setPhoneError("");
    }

    const isValid =
      email.trim() !== "" &&
      formData.country.trim() !== "" &&
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.address.trim() !== "" &&
      formData.postalCode.trim() !== "" &&
      formData.city.trim() !== "" &&
      formData.phone.trim() !== "" &&
      isPhoneValid;

    setIsFormValid(isValid);
  }, [email, formData]);

  useEffect(() => {
    if (formData.country) {
      const selectedCountry = countries.find(
        (c) => c.code === formData.country
      );
      if (selectedCountry) {
        setPhoneCode(selectedCountry.phoneCode);

        if (
          formData.phone &&
          !formData.phone.startsWith(selectedCountry.phoneCode)
        ) {
          const phoneWithoutCode = formData.phone.replace(/^\+\d+\s?/, "");
          setFormData((prev) => ({
            ...prev,
            phone: `${selectedCountry.phoneCode} ${phoneWithoutCode}`,
          }));
        } else if (!formData.phone) {
          setFormData((prev) => ({
            ...prev,
            phone: `${selectedCountry.phoneCode} `,
          }));
        }
      }
    }
  }, [formData.country]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + tax + shipping;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const numbersAndPlusOnly = value.replace(/[^\d+\s]/g, "");

    if (!phoneCode) {
      setFormData((prev) => ({ ...prev, phone: numbersAndPlusOnly }));
      return;
    }

    if (
      numbersAndPlusOnly.startsWith("+") &&
      !numbersAndPlusOnly.startsWith(phoneCode)
    ) {
      setFormData((prev) => ({ ...prev, phone: numbersAndPlusOnly }));
      return;
    }

    if (!numbersAndPlusOnly.startsWith(phoneCode)) {
      const numbersOnly = numbersAndPlusOnly.replace(/^\+?\d*\s?/, "");
      const cleanNumbers = numbersOnly.replace(/\D/g, "");

      if (cleanNumbers) {
        setFormData((prev) => ({
          ...prev,
          phone: `${phoneCode} ${cleanNumbers}`,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          phone: `${phoneCode} `,
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, phone: numbersAndPlusOnly }));
    }
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      [8, 9, 27, 13, 37, 38, 39, 40, 46].includes(e.keyCode) ||
      (e.ctrlKey === true && [65, 67, 86, 88].includes(e.keyCode))
    ) {
      return;
    }

    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105) &&
      e.keyCode !== 107 &&
      e.keyCode !== 187 &&
      e.keyCode !== 32
    ) {
      e.preventDefault();
    }
  };

  const handleContinue = () => {
    if (isFormValid) {
      // СОХРАНЯЕМ ДАННЫЕ В LOCALSTORAGE ПЕРЕД ПЕРЕХОДОМ
      const dataToSave: SavedFormData = {
        email,
        formData,
        saveInfo,
      };
      localStorage.setItem("shippingInfo", JSON.stringify(dataToSave));

      console.log("Form data:", { email, ...formData });
      router.push("/shipping");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-satoshi">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-sans">shopco</h1>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-500 space-x-2">
            <span>Cart</span>
            <span>/</span>
            <span className="text-black font-medium">Info</span>
            <span>/</span>
            <span>Shipping</span>
            <span>/</span>
            <span>Payment</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="pr-16">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Contact</h2>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-8 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <div className="absolute left-3 top-3 text-gray-400">
                    <svg
                      width="16"
                      height="27"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>

              <div className="space-y-4">
                <div className="relative">
                  <Select
                    placeholder="Select Country..."
                    instanceId="country-select"
                    options={options}
                    formatOptionLabel={(option) => (
                      <div className="flex items-center space-x-2">
                        <span className={`fi fi-${option.flagCode}`}></span>
                        <span>{option.label}</span>
                      </div>
                    )}
                    onChange={(opt) =>
                      setFormData({ ...formData, country: opt?.value || "" })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Company(Optional)"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <div className="absolute right-3 top-3 text-gray-400">
                    <svg
                      width="20"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Apartment,Suite,Etc.(Optional)"
                  value={formData.apartment}
                  onChange={(e) =>
                    setFormData({ ...formData, apartment: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={(e) =>
                      setFormData({ ...formData, postalCode: e.target.value })
                    }
                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    onKeyDown={handlePhoneKeyDown}
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 pl-4 ${
                      phoneError
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-green-500"
                    }`}
                  />
                  <div className="absolute right-3 top-3 text-gray-400">
                    <svg
                      width="20"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                </div>

                {phoneError && (
                  <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                )}

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={saveInfo}
                    onChange={(e) => setSaveInfo(e.target.checked)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-600">
                    Save This Information For Next Time
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => router.push("/cart")}
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
                <span>Return To Cart</span>
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
                Continue To Shipping
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
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            −
                          </button>
                          <span className="text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold">${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="my-6" />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({items.length})</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <hr className="my-3" />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Orders:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  The total amount you pay includes all applicable customs
                  duties & taxes. We guarantee no additional charges on delivery
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
