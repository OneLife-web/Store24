import SingleProductContainer from "@/components/products/SingleProductContainer";
import { fetchProduct } from "@/lib/PowerHouse";

const ProductDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  let data;

  if (id) {
    data = await fetchProduct(id);
    console.log(data);
  }
  return (
    <main className="lg:max-w-4xl min-h-screen mx-auto xl:max-w-5xl w-full">
      <SingleProductContainer data={data} />
    </main>
  );
};

export default ProductDetailsPage;
