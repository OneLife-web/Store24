import ProductContainer from "@/components/products/ProductContainer";
import { fetchProducts } from "@/lib/PowerHouse";
import { Loader2 } from "lucide-react";

const ProductPage = async () => {
  const data = await fetchProducts();
  return (
    <main className="lg:max-w-4xl min-h-screen mx-auto xl:max-w-5xl w-full">
      {data ? (
        <ProductContainer data={data} />
      ) : (
        <div className="flex items-center justify-center">
          <Loader2 size={32} className="animate-spin" />
        </div>
      )}
    </main>
  );
};

export default ProductPage;
