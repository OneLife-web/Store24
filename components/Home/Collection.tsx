import { updateData } from "@/types";
import ProductCard from "../Cards/ProductCard";

const Collection = ({ products }: { products: updateData[] }) => {
  return (
    <section className="py-10 max-lg:px-[3%]">
      <div>
        <h1 className="heading1">Strong Grip Collection</h1>
        <div className="grid mt-6 grid-cols-2 gap-3 lg:grid-cols-4">
          {products.map((item, i) => (
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            <ProductCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
