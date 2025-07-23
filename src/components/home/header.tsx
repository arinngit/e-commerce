'use client'

import Image from "next/image";

export default function Header() {
  const scrollToArrivals = () => {
    const arrivalsSection = document.getElementById("arrivals");
    if (arrivalsSection) {
      arrivalsSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans text-black leading-tight text-center lg:text-left">
                FIND CLOTHES
                <br />
                THAT MATCHES
                <br />
                YOUR STYLE
              </h1>
              <p className="text-gray-600 font-satoshi font-regular text-center lg:text-left">
                Browse through our diverse range of meticulously crafted
                garments, designed <br className="hidden lg:block" /> to bring
                out your individuality and cater to your sense of style.
              </p>

              <div className="flex justify-center lg:justify-start">
                <button
                  onClick={scrollToArrivals}
                  className="bg-black text-white font-satoshi font-regular px-12 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Shop Now
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-satoshi font-bold text-black">
                  200+
                </div>
                <div className="text-gray-600 font-satoshi font-regular">
                  International Brands
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-satoshi font-bold text-black">
                  2,000+
                </div>
                <div className="text-gray-600 font-satoshi font-regular">
                  High-Quality Products
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-satoshi font-bold text-black">
                  30,000+
                </div>
                <div className="text-gray-600 font-satoshi font-regular">
                  Happy Customers
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden w-full flex justify-center mt-8">
        <Image
          src="/man.png"
          alt="Man in fashion"
          width={300}
          height={400}
          className="object-contain"
          priority
        />
      </div>

      <div className="hidden lg:block absolute right-0 bottom-0 z-0">
        <Image
          src="/man.png"
          alt="Man in fashion"
          width={500}
          height={600}
          className="object-contain"
          priority
        />
      </div>
    </section>
  );
}
