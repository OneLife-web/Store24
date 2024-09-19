const ProductCard = () => {
  return (
    <div className="group cursor-pointer">
      <div className="min-w-[150px] md:min-w-[200px] h-[150px] bg-gray-200"></div>
      <p className="text-sm font-semibold my-2 w-fit border-b border-transparent group-hover:border-primary transition-all duration-300">
        DynaGrip 2.0™
      </p>
      <p className="bodyText !font-semibold !opacity-100 !max-sm:text-base text-lg">
        $19.94 USD
      </p>
    </div>
  );
};

export default ProductCard;
