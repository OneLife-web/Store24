import { updateData } from "@/types";
import ProductCard from "../Cards/ProductCard";

const Collection = ({ products }: { products: updateData[] }) => {
  return (
    <section className="py-10 pb-40 max-lg:px-[3%]">
      <div>
        <h1 className="heading1">Latest in Store</h1>
        <div className="grid mt-6 grid-cols-2 gap-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {products.reverse().map((item, i) => (
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            <ProductCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
