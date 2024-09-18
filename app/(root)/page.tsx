import Collection from "@/components/Home/Collection";
import Promotion from "@/components/Home/Promotion";

export default function Home() {
  return (
    <main className="lg:max-w-4xl mx-auto xl:max-w-5xl w-full">
      <Promotion />
      <Collection />
    </main>
  );
}
