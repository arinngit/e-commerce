"use client";

import FooterWithNewsletter from "@/components/footer";
import Navbar from "@/components/layout/header/navbar";
import { useState } from "react";
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function Contacts() {
  const t = useTranslations("ContactPage");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t("form.success_message"));
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-sans font-bold text-gray-900 mb-4">
            {t("title")}
          </h1>
          <p className="text-xl font-satoshi font-medium text-gray-600 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 font-satoshi font-medium">
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                {t("info_section.title")}
              </h2>

              <div className="space-y-5">
                <div className="flex items-start">
                  <FiMapPin
                    className="text-blue-600 mt-1 mr-4 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {t("info_section.address_label")}
                    </h3>
                    <p className="text-gray-600">{t("info_section.address")}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiPhone
                    className="text-blue-600 mt-1 mr-4 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {t("info_section.phones_label")}
                    </h3>
                    <p className="text-gray-600">+994 12 345 67 89</p>
                    <p className="text-gray-600">+994 50 123 45 67</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiMail
                    className="text-blue-600 mt-1 mr-4 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {t("info_section.email_label")}
                    </h3>
                    <p className="text-gray-600">support@ecommerce.az</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiClock
                    className="text-blue-600 mt-1 mr-4 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {t("info_section.hours_label")}
                    </h3>
                    <p className="text-gray-600">
                      {t("info_section.hours.weekdays")}
                    </p>
                    <p className="text-gray-600">
                      {t("info_section.hours.saturday")}
                    </p>
                    <p className="text-gray-600">
                      {t("info_section.hours.sunday")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                {t("social_section.title")}
              </h2>

              <div className="flex space-x-6">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="text-pink-500 hover:text-pink-700"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  className="text-blue-400 hover:text-blue-600"
                >
                  <FaTwitter size={24} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  className="text-blue-700 hover:text-blue-900"
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {t("form.title")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("form.name_label")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("form.email_label")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("form.subject_label")}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("form.message_label")}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-40"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <FiSend className="mr-2" />
                {t("form.submit_button")}
              </button>
            </form>
          </div>
        </div>

        <div className="mb-16 font-satoshi font-medium">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {t("map_section.title")}
          </h2>
          <div className="rounded-xl overflow-hidden shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.5306929953263!2d49.84167481519424!3d40.37767097936664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d4c90d5a9cd%3A0x123456789abcdef!2sBaku%2C%20Azerbaijan!5e0!3m2!1sen!2s!4v1692032345678!5m2!1sen!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              className="rounded-xl"
            ></iframe>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm font-satoshi font-medium">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {t("additional_info.title")}
          </h2>
          <div className="prose text-gray-600 space-y-4">
            <p>{t("additional_info.point1")}</p>
            <p>{t("additional_info.point2")}</p>
            <p>{t("additional_info.point3")}</p>
          </div>
        </div>
      </div>
      <FooterWithNewsletter />
    </div>
  );
}
