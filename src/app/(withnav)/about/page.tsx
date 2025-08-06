import FooterWithNewsletter from "@/components/footer";
import Navbar from "@/components/layout/header/navbar";

export default function About() {
  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-sans text-center mb-8">
          ABOUT US
        </h1>

        <div className="text-gray-600 font-satoshi font-bold text-center space-y-6 text-base sm:text-lg leading-relaxed">
          <p>
            We are a passionate team of creators, developers, and innovators
            dedicated to building meaningful digital experiences. Our mission is
            to deliver high-quality solutions that not only solve problems, but
            also inspire and connect people.
          </p>
          <p>
            Since our founding, we’ve always believed in the power of design and
            technology to create change. Whether we’re building platforms,
            designing interfaces, or crafting content — we do it with heart,
            skill, and purpose.
          </p>
          <p>
            Our team combines years of experience with a forward-thinking
            mindset. We constantly challenge ourselves to stay on the cutting
            edge of modern technologies and trends to ensure our clients and
            users receive the best possible results.
          </p>
          <p>
            Collaboration is at the core of our culture. We believe great ideas
            come from listening deeply, working openly, and thinking boldly.
            Each project is a new opportunity to grow, to learn, and to push
            boundaries.
          </p>
          <p>
            We’re not just building products — we’re shaping the future of how
            people interact with the digital world. Thank you for being a part
            of our journey.
          </p>
          <p>
            Every member of our team brings something unique to the table. From different backgrounds, disciplines, and experiences — we thrive on diversity and curiosity. This makes our creative process richer and more powerful.
          </p>
          <p>
            We value transparency, integrity, and long-term relationships. We don't just deliver a product and walk away. We support, improve, and grow with our clients and their users. Success for us means creating something that lasts and leaves a positive mark.
          </p>
          <p>
            In a fast-paced world where trends come and go, we remain focused on what truly matters: quality, user experience, and meaningful impact. We choose purpose over flash, and value over hype.
          </p>
          <p>
            Our vision is simple — to build a digital space where users feel understood, empowered, and inspired. We believe that even the smallest detail can shape the biggest impression, and that’s why we obsess over getting things right.
          </p>
          <p>
            From day one, our goal has been to create with intention. Whether we’re designing interfaces or writing lines of code, everything we do is guided by our mission to serve people through technology.
          </p>
          <p>
            Thank you for taking the time to learn more about us. We’re excited for what the future holds — and we’d be honored to explore it with you.
          </p>
        </div>
      </div>

      <FooterWithNewsletter />
    </div>
  );
}
