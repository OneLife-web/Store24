import SingleProductContainer from "@/components/products/SingleProductContainer";
import { fetchProduct } from "@/lib/PowerHouse";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;

  if (id) {
    const data = await fetchProduct(id);

    if (data) {
      const featuresString = data.features
        ? data.features.join(", ")
        : "Check out this product on Store45co.";
      return {
        title: `${data.title} - Store45co`, // Dynamically setting product name in title
        description: `Buy ${data.title} at Store45co. ${featuresString}`, // Dynamic description based on product
        openGraph: {
          title: `${data.title} - Store45co`,
          description: `Buy ${data.title} at Store45co. ${featuresString}`,
          url: `https://www.store45co.com/product/${id}`,
          images: [
            {
              url: data?.images[0]?.url, // Assuming product data includes an image URL
              alt: `${data.title} image`,
              width: 1200,
              height: 630,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: `${data.title} - Store45co`,
          description: `Buy ${data.title} at Store45co. ${featuresString}`,
          images: [
            {
              url: data?.images[0]?.url,
              alt: `${data.title} image`,
            },
          ],
        },
      };
    }
  }

  // Fallback metadata
  return {
    title: "Product Details - Store45co",
    description: "View product details at Store45co.",
  };
}

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
