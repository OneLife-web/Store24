import Collection from "@/components/Home/Collection";
import Promotion from "@/components/Home/Promotion";
import { fetchProducts, getSettings } from "@/lib/PowerHouse";
import { Settings, updateData } from "@/types";

export const metadata = {
  revalidate: 180, // Revalidate every 10 seconds
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
