"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../../../../store/carts";
import { ShoppingBag, ChevronRight, Check, Home } from "lucide-react";
import Image from "next/image";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    country: "",
    city: "",
    postalCode: "",
    paymentMethod: "",
  });

  const router = useRouter();
  const { items, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-12 px-4">
        <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-satoshi font-bold text-gray-800 mb-3">
          Ваша корзина пуста
        </h2>
        <p className="text-gray-600 mb-6 font-satoshi">
          Прежде чем оформить заказ, добавьте товары в корзину
        </p>
        <button
          onClick={() => router.push("/shop")}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-satoshi font-bold flex items-center mx-auto"
        >
          <Home className="w-5 h-5 mr-2" />
          Вернуться в магазин
        </button>
      </div>
    );
  }

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 15;
  const total = subtotal + deliveryFee;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order submitted:", { ...formData, items });
    nextStep();
    clearCart();
  };

  const steps = [
    { id: 1, name: "Корзина", status: step > 1 ? "complete" : "current" },
    {
      id: 2,
      name: "Доставка",
      status: step === 2 ? "current" : step > 2 ? "complete" : "upcoming",
    },
    {
      id: 3,
      name: "Оплата",
      status: step === 3 ? "current" : step > 3 ? "complete" : "upcoming",
    },
    {
      id: 4,
      name: "Подтверждение",
      status: step === 4 ? "current" : "upcoming",
    },
  ];

  if (step === 1) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <nav className="flex items-center justify-center mb-12">
          <ol className="flex items-center space-x-8">
            {steps.map((stepItem) => (
              <li key={stepItem.name} className="flex items-center">
                {stepItem.status === "complete" ? (
                  <div className="flex items-center">
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-black">
                      <Check className="h-5 w-5 text-white" />
                    </span>
                    <span className="ml-3 font-satoshi font-medium text-black">
                      {stepItem.name}
                    </span>
                  </div>
                ) : stepItem.status === "current" ? (
                  <div className="flex items-center">
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-black" />
                    </span>
                    <span className="ml-3 font-satoshi font-medium text-black">
                      {stepItem.name}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent" />
                    </span>
                    <span className="ml-3 font-satoshi font-medium text-gray-500">
                      {stepItem.name}
                    </span>
                  </div>
                )}
                {stepItem.id !== steps.length && (
                  <span className="mx-4 h-0.5 w-12 bg-gray-300" />
                )}
              </li>
            ))}
          </ol>
        </nav>

        <h1 className="text-3xl font-satoshi font-bold mb-8">Ваш заказ</h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center p-4 border-b border-gray-100 last:border-0"
            >
              <div className="w-24 h-24 bg-gray-50 rounded-lg flex-shrink-0 overflow-hidden mr-6">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-satoshi font-bold text-lg mb-1">
                  {item.name}
                </h3>
                <p className="font-satoshi text-gray-600 text-sm mb-2">
                  Размер: {item.size}, Цвет: {item.color}
                </p>
                <p className="font-satoshi text-gray-600 text-sm">
                  Количество: {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="font-satoshi font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="space-y-3">
            <div className="flex justify-between font-satoshi">
              <span className="text-gray-600">Сумма:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-satoshi">
              <span className="text-gray-600">Доставка:</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 my-3"></div>
            <div className="flex justify-between font-satoshi font-bold text-lg">
              <span>Итого:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={nextStep}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-satoshi font-bold flex items-center"
          >
            Продолжить оформление <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    );
  }

  if (step === 2) {
    const handleDeliverySubmit = (e: React.FormEvent) => {
      e.preventDefault();
      nextStep(); // Только переход, без очистки
    };
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <nav className="flex items-center justify-center mb-12">
          <ol className="flex items-center space-x-8">
            {steps.map((stepItem) => (
              <li key={stepItem.name} className="flex items-center">
                {stepItem.status === "complete" ? (
                  <div className="flex items-center">
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-black">
                      <Check className="h-5 w-5 text-white" />
                    </span>
                    <span className="ml-3 font-satoshi font-medium text-black">
                      {stepItem.name}
                    </span>
                  </div>
                ) : stepItem.status === "current" ? (
                  <div className="flex items-center">
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-black" />
                    </span>
                    <span className="ml-3 font-satoshi font-medium text-black">
                      {stepItem.name}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent" />
                    </span>
                    <span className="ml-3 font-satoshi font-medium text-gray-500">
                      {stepItem.name}
                    </span>
                  </div>
                )}
                {stepItem.id !== steps.length && (
                  <span className="mx-4 h-0.5 w-12 bg-gray-300" />
                )}
              </li>
            ))}
          </ol>
        </nav>

        <h1 className="text-3xl font-satoshi font-bold mb-8">
          Информация о доставке
        </h1>

        <form
          onSubmit={handleDeliverySubmit}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block mb-2 font-satoshi font-medium">
                Имя*
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent font-satoshi"
              />
            </div>

            <div>
              <label className="block mb-2 font-satoshi font-medium">
                Фамилия*
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent font-satoshi"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-satoshi font-medium">
                Адрес*
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent font-satoshi"
              />
            </div>

            <div>
              <label className="block mb-2 font-satoshi font-medium">
                Телефон*
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent font-satoshi"
                pattern="[0-9]{10,15}"
                title="Номер телефона (только цифры, 10-15 символов)"
              />
            </div>

            <div>
              <label className="block mb-2 font-satoshi font-medium">
                Страна*
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent font-satoshi"
              >
                <option value="">Выберите страну</option>
                <option value="Russia">Россия</option>
                <option value="Kazakhstan">Казахстан</option>
                <option value="Belarus">Беларусь</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-satoshi font-medium">
                Город*
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent font-satoshi"
              />
            </div>

            <div>
              <label className="block mb-2 font-satoshi font-medium">
                Почтовый индекс*
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent font-satoshi"
                pattern="[0-9]{5,10}"
                title="Почтовый индекс (5-10 цифр)"
              />
            </div>
          </div>

          <div className="flex justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-satoshi font-medium"
            >
              Назад
            </button>
            <button
              type="submit"
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-satoshi font-bold"
            >
              Продолжить
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <nav className="flex items-center justify-center mb-12">
          <ol className="flex items-center space-x-8">
            {steps.map((stepItem) => (
              <li key={stepItem.name} className="flex items-center">
                {stepItem.status === "complete" ? (
                  <div className="flex items-center">
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-black">
                      <Check className="h-5 w-5 text-white" />
                    </span>
                    <span className="ml-3 font-satoshi font-medium text-black">
                      {stepItem.name}
                    </span>
                  </div>
                ) : stepItem.status === "current" ? (
                  <div className="flex items-center">
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-black" />
                    </span>
                    <span className="ml-3 font-satoshi font-medium text-black">
                      {stepItem.name}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent" />
                    </span>
                    <span className="ml-3 font-satoshi font-medium text-gray-500">
                      {stepItem.name}
                    </span>
                  </div>
                )}
                {stepItem.id !== steps.length && (
                  <span className="mx-4 h-0.5 w-12 bg-gray-300" />
                )}
              </li>
            ))}
          </ol>
        </nav>

        <h1 className="text-3xl font-satoshi font-bold mb-8">Способ оплаты</h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* PayPal Кнопка */}
          <PayPalScriptProvider
            options={{
              clientId: "test", // Используем clientId вместо "client-id"
              currency: "USD",
              intent: "capture", // Добавляем обязательный параметр
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE", // Добавляем intent в заказ
                  purchase_units: [
                    {
                   amount: {
                        value: total.toFixed(2),
                        currency_code: "USD",
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order!.capture().then((details) => {
                  console.log("Payment completed:", details);
                  setFormData({ ...formData, paymentMethod: "paypal" });
                  nextStep();
                  clearCart();
                });
              }}
              onError={(err) => {
                console.error("PayPal error:", err);
                alert("Payment failed");
              }}
            />
          </PayPalScriptProvider>

          {/* Кнопка "Назад" */}
          <div className="flex justify-start pt-6 border-t border-gray-200 mt-6">
            <button
              onClick={prevStep}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-satoshi font-medium"
            >
              Назад
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <nav className="flex items-center justify-center mb-12">
          <ol className="flex items-center space-x-8">
            {steps.map((stepItem) => (
              <li key={stepItem.name} className="flex items-center">
                {stepItem.status === "complete" ? (
                  <div className="flex items-center">
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-black">
                      <Check className="h-5 w-5 text-white" />
                    </span>
                    <span className="ml-3 font-satoshi font-medium text-black">
                      {stepItem.name}
                    </span>
                  </div>
                ) : stepItem.status === "current" ? (
                  <div className="flex items-center">
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-black" />
                    </span>
                    <span className="ml-3 font-satoshi font-medium text-black">
                      {stepItem.name}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent" />
                    </span>
                    <span className="ml-3 font-satoshi font-medium text-gray-500">
                      {stepItem.name}
                    </span>
                  </div>
                )}
                {stepItem.id !== steps.length && (
                  <span className="mx-4 h-0.5 w-12 bg-gray-300" />
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-satoshi font-bold mb-3">
            Спасибо за ваш заказ!
          </h1>
          <p className="font-satoshi text-gray-600 max-w-md mx-auto">
            Подробности заказа отправлены на вашу почту. Номер вашего заказа: #
            {Math.floor(Math.random() * 1000000)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-satoshi font-bold mb-6">Детали заказа</h2>

          <div className="mb-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center py-4 border-b border-gray-100 last:border-0"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-lg flex-shrink-0 overflow-hidden mr-4">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-satoshi font-medium">{item.name}</h3>
                  <p className="font-satoshi text-gray-600 text-sm">
                    Размер: {item.size}, Цвет: {item.color}
                  </p>
                  <p className="font-satoshi text-gray-600 text-sm">
                    Количество: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-satoshi font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-satoshi font-bold text-lg mb-4">
              Информация о доставке
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-satoshi">
              <div>
                <p className="font-medium">Имя:</p>
                <p>
                  {formData.firstName} {formData.lastName}
                </p>
              </div>
              <div>
                <p className="font-medium">Телефон:</p>
                <p>{formData.phone}</p>
              </div>
              <div>
                <p className="font-medium">Адрес:</p>
                <p>{formData.address}</p>
              </div>
              <div>
                <p className="font-medium">Город:</p>
                <p>
                  {formData.city}, {formData.postalCode}, {formData.country}
                </p>
              </div>
              <div>
                <p className="font-medium">Способ оплаты:</p>
                <p>
                  {formData.paymentMethod === "creditCard"
                    ? "Кредитная карта"
                    : formData.paymentMethod === "paypal"
                    ? "PayPal"
                    : "Наличные при получении"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => router.push("/shop")}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-satoshi font-bold inline-flex items-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Вернуться в магазин
          </button>
        </div>
      </div>
    );
  }
  return null;
}
