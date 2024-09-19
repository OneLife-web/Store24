import ProductCard from "../Cards/ProductCard";

const Collection = () => {
  return (
    <section className="py-10 max-lg:px-[3%]">
      <div>
        <h1 className="heading1">Strong Grip Collection</h1>
        <div className="grid mt-6 grid-cols-2 gap-3 lg:grid-cols-4">
          {[0, 0, 0, 0].map((_, i) => (
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            <ProductCard key={1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
