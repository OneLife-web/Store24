import SortDropdown from "../SortDropdown";
import Slider from "./Slider";

interface SortDropdownProps {
  sortOption: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FilterSort: React.FC<SortDropdownProps> = ({ sortOption, onChange }) => {
  return (
    <div className="md:hidden">
      <Slider
        trigger={
          <div className="flex items-center gap-3">
            <svg
              className="w-6"
              aria-hidden="true"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                d="M4.833 6.5a1.667 1.667 0 1 1 3.334 0 1.667 1.667 0 0 1-3.334 0ZM4.05 7H2.5a.5.5 0 0 1 0-1h1.55a2.5 2.5 0 0 1 4.9 0h8.55a.5.5 0 0 1 0 1H8.95a2.5 2.5 0 0 1-4.9 0Zm11.117 6.5a1.667 1.667 0 1 0-3.334 0 1.667 1.667 0 0 0 3.334 0ZM13.5 11a2.5 2.5 0 0 1 2.45 2h1.55a.5.5 0 0 1 0 1h-1.55a2.5 2.5 0 0 1-4.9 0H2.5a.5.5 0 0 1 0-1h8.55a2.5 2.5 0 0 1 2.45-2Z"
                fill="black"
              ></path>
            </svg>
            <p className="bodyText">Filter and sort</p>
          </div>
        }
      >
        <div>
          <div className="border-b pb-3">
            <p className="font-semibold text-sm text-center">Fitler and sort</p>
            <p className="bodyText text-center">4 products</p>
          </div>
          <div className="px-[3%] py-5 pt-10">
            <SortDropdown sortOption={sortOption} onChange={onChange} />
          </div>
          <div className="absolute right-[3%] left-[3%] bottom-7 flex gap-3 items-center">
            <div className="basis-1/2 flex items-center justify-center">
              <button className="text-primary font-medium h-fit border-b border-primary">Remove all</button>
            </div>
            <div className="basis-1/2 flex items-center justify-center">
              <button className="w-full h-[48px] font-medium bg-primary text-white">Apply</button>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default FilterSort;