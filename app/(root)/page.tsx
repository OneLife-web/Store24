import Collection from "@/components/Home/Collection";
import Promotion from "@/components/Home/Promotion";
import { fetchProducts, getSettings } from "@/lib/PowerHouse";
import { Settings, updateData } from "@/types";

export const metadata = {
  title: "Store45co - Your One-Stop Online Shop for Quality Products",
  description:
    "Discover a wide range of high-quality products at unbeatable prices on Store45co. From electronics to fashion and home essentials, we've got everything you need in one place.",
  keywords:
    "ecommerce, dropshipping, online store, Store45co, buy online, affordable products, electronics, fashion, home essentials, quality products",
  openGraph: {
    title: "Store45co - Your One-Stop Online Shop",
    description:
      "Shop a wide range of quality products at unbeatable prices on Store45co. Find the latest electronics, fashion, and more, delivered straight to your doorstep.",
    url: "https://www.store45co.com",
    siteName: "Store45co",
    images: [
      {
        url: "https://ik.imagekit.io/krr3p3joi/WhatsApp_Image_2024-09-17_at_9.36.42_PM__1_-removebg-preview.png?updatedAt=1728162862298",
        width: 1200,
        height: 630,
        alt: "Store45co Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function Home() {
  const [settingsResult, productsResult] = await Promise.allSettled([
    getSettings(),
    fetchProducts(),
  ]);

  const data: Settings | null =
    settingsResult.status === "fulfilled" ? settingsResult.value : null;
  const products: updateData[] =
    productsResult.status === "fulfilled" ? productsResult.value : [];
  return (
    <main className="lg:max-w-4xl min-h-screen mx-auto xl:max-w-5xl w-full">
      {data && <Promotion data={data} />}
      {products && <Collection products={products} />}
    </main>
  );
}
