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
    <main>
      <SingleProductContainer data={data} />
    </main>
  );
};

export default ProductDetailsPage;
