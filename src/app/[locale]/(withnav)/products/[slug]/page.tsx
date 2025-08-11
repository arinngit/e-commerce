import { fetchProductById } from "@/app/api/products";
import Footer from "@/components/footer";
import Navbar from "@/components/layout/header/navbar";
import Details from "@/components/products/details";
import MaybeLike from "@/components/products/maybe-like";
import Reviews from "@/components/products/reviews";
import { Product } from "@/types/product";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await fetchProductById(params.slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Navbar />
      <Details product={product} />
      <Reviews productId={product.id} />
      <MaybeLike />
      <Footer/>
    </div>
  );
}