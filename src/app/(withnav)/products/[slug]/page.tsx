import { fetchProductById } from "@/app/api/products";
import Navbar from "@/components/layout/header/navbar";
import Details from "@/components/products/details";
import ProductDetails from "@/components/ui/product-details";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;

  const product = await fetchProductById(slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Navbar />
      <Details />
    </div>
  );
}