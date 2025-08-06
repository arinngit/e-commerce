import { Mail } from "lucide-react";
import { Twitter, Facebook, Instagram, Github } from "lucide-react";
import Link from "next/link";

export default function FooterWithNewsletter() {
  return (
    <footer className="relative mt-20 md:mt-60">
      <section className="flex justify-center absolute -top-20 md:-top-40 w-full z-10 px-4">
        <div className="bg-black w-full max-w-6xl flex flex-col md:flex-row justify-between items-center p-6 md:p-20 rounded-2xl text-white gap-6 md:gap-0">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold">
              STAY UPTO DATE ABOUT
            </h1>
            <h1 className="text-2xl md:text-4xl font-bold">
              OUR LATEST OFFERS
            </h1>
          </div>

          <div className="flex gap-4 flex-col w-full md:w-auto">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="py-3 md:py-4 pl-12 pr-6 w-full rounded-full font-satoshi text-black bg-white focus:outline-none text-sm md:text-base"
              />
            </div>
            <button className="py-3 md:py-4 px-6 w-full rounded-full text-black bg-white focus:outline-none">
              <p className="font-satoshi font-medium text-sm md:text-base">
                Subscribe to Newsletter
              </p>
            </button>
          </div>
        </div>
      </section>

      <div className="bg-[#F0F0F0] pt-28 md:pt-50 pb-20 md:pb-40 px-4 md:px-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 lg:justify-between">
          <div className="flex flex-col gap-6 md:gap-10 lg:max-w-xs">
            <h1 className="text-3xl md:text-5xl font-bold">SHOP</h1>
            <p className="font-satoshi text-sm md:text-base">
              We have clothes that suits your style and which you're proud to
              wear. From women to men.
            </p>
            <div className="flex gap-3 md:gap-4">
              <a
                href="#"
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-800 hover:text-white transition"
              >
                <Twitter className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition"
              >
                <Facebook className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-800 hover:text-white transition"
              >
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-800 hover:text-white transition"
              >
                <Github className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
            <div className="flex flex-col gap-4 md:gap-6">
              <h3 className="font-satoshi font-bold text-sm md:text-base">
                COMPANY
              </h3>
              <div className="flex flex-col gap-3 md:gap-4">
                <Link href="/about">
                  <p className="font-satoshi text-sm md:text-base hover:text-gray-600 cursor-pointer transition">
                    About
                  </p>
                </Link>
                <p className="font-satoshi text-sm md:text-base hover:text-gray-600 cursor-pointer transition">
                  Features
                </p>
                <p className="font-satoshi text-sm md:text-base hover:text-gray-600 cursor-pointer transition">
                  Works
                </p>
                <p className="font-satoshi text-sm md:text-base hover:text-gray-600 cursor-pointer transition">
                  Career
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:gap-6">
              <h3 className="font-satoshi font-bold text-sm md:text-base">
                HELP
              </h3>
              <div className="flex flex-col gap-3 md:gap-4">
                <p className="font-satoshi text-sm md:text-base hover:text-gray-600 cursor-pointer transition">
                  Customer Support
                </p>
                <p className="font-satoshi text-sm md:text-base hover:text-gray-600 cursor-pointer transition">
                  Delivery Details
                </p>
                <p className="font-satoshi text-sm md:text-base hover:text-gray-600 cursor-pointer transition">
                  Terms & Conditions
                </p>
                <p className="font-satoshi text-sm md:text-base hover:text-gray-600 cursor-pointer transition">
                  Private Policy
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:gap-6">
              <h3 className="font-satoshi font-bold text-sm md:text-base">
                FAQ
              </h3>
              <div className="flex flex-col gap-3 md:gap-4">
                <p className="font-satoshi text-sm md:text-base hover:text-gray-600 cursor-pointer transition">
                  Account
                </p>
                <p className="font-satoshi text-sm md:text-base hover:text-gray-600 cursor-pointer transition">
                  Manage Deliveries
                </p>
                <p className="font-satoshi text-sm md:text-base hover:text-gray-600 cursor-pointer transition">
                  Orders
                </p>
                <p className="font-satoshi text-sm md:text-base hover:text-gray-600 cursor-pointer transition">
                  Payments
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:gap-6">
              <h3 className="font-satoshi font-bold text-sm md:text-base">
                RESOURCES
              </h3>
              <div className="flex flex-col gap-3 md:gap-4">
                <p className="font-satoshi text-sm md:text-base hover:text-gray-600 cursor-pointer transition">
                  Free eBooks
                </p>
                <p className="font-satoshi text-sm md:text-base hover:text-gray-600 cursor-pointer transition">
                  Development Tutorial
                </p>
                <p className="font-satoshi text-sm md:text-base hover:text-gray-600 cursor-pointer transition">
                  How to - Blog
                </p>
                <p className="font-satoshi text-sm md:text-base hover:text-gray-600 cursor-pointer transition">
                  Youtube Playlist
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F0F0F0] md:px-20 -mt-16">
        <div className="w-full h-[1px] bg-gray-300 mb-9" />
        <div className="pb-6 flex justify-center md:justify-start">
          <p className="font-satoshi text-xs md:text-sm text-gray-600">
            Shop.co © 2000-2023, All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
