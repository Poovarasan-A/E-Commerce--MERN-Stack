import { FaMobileButton } from "react-icons/fa6";

import { BsFillLaptopFill } from "react-icons/bs";
import { GiClothes } from "react-icons/gi";
import { ImBooks } from "react-icons/im";
import { GiLipstick } from "react-icons/gi";
import { MdOutlineSportsTennis } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { GiConverseShoe } from "react-icons/gi";
import { MdToys } from "react-icons/md";
import { FaKitchenSet } from "react-icons/fa6";
import { MdHealthAndSafety } from "react-icons/md";
import { Link } from "react-router-dom";

const CategoryTab = () => {
  return (
    <div className="lg:hidden w-full h-full py-[5rem] px-2 text-neutral-700">
      <div className="w-full h-full flex flex-wrap justify-around gap-2">
        <Link
          to=""
          className="  flex-col bg-neutral-200 bg-opacity-70 w-[30%] h-[23%] flex items-center justify-center gap-3"
        >
          <PiTelevisionSimpleFill className="text-3xl" />
          <p>Electronics</p>
        </Link>
        <Link
          to=""
          className="  flex-col bg-neutral-200 bg-opacity-70 w-[30%] h-[23%] flex items-center justify-center gap-3"
        >
          <FaMobileButton className="text-3xl" />
          <p>Mobiles</p>
        </Link>
        <Link
          to=""
          className="  flex-col bg-neutral-200 bg-opacity-70 w-[30%] h-[23%] flex items-center justify-center gap-3"
        >
          <BsFillLaptopFill className="text-3xl" />
          <p>Laptops</p>
        </Link>
        <Link
          to=""
          className="  flex-col bg-neutral-200 bg-opacity-70 w-[30%] h-[23%] flex items-center justify-center gap-3"
        >
          <GiClothes className="text-3xl" />
          <p>Clothes</p>
        </Link>
        <Link
          to=""
          className="  flex-col bg-neutral-200 bg-opacity-70 w-[30%] h-[23%] flex items-center justify-center gap-3"
        >
          <ImBooks className="text-3xl" />
          <p>Books</p>
        </Link>
        <Link
          to=""
          className="  flex-col bg-neutral-200 bg-opacity-70 w-[30%] h-[23%] flex items-center justify-center gap-3"
        >
          <GiLipstick className="text-3xl" />
          <p>Beauty</p>
        </Link>
        <Link
          to=""
          className="  flex-col bg-neutral-200 bg-opacity-70 w-[30%] h-[23%] flex items-center justify-center gap-3"
        >
          <MdOutlineSportsTennis className="text-3xl" />
          <p>Sports</p>
        </Link>
        <Link
          to=""
          className="  flex-col bg-neutral-200 bg-opacity-70 w-[30%] h-[23%] flex items-center justify-center gap-3"
        >
          <IoHomeSharp className="text-3xl" />
          <p>Appliances</p>
        </Link>
        <Link
          to=""
          className="  flex-col bg-neutral-200 bg-opacity-70 w-[30%] h-[23%] flex items-center justify-center gap-3"
        >
          <GiConverseShoe className="text-3xl" />
          <p>Accessories</p>
        </Link>
        <Link
          to=""
          className="  flex-col bg-neutral-200 bg-opacity-70 w-[30%] h-[23%] flex items-center justify-center gap-3"
        >
          <MdToys className="text-3xl" />
          <p>Toys & Baby</p>
        </Link>
        <Link
          to=""
          className="  flex-col bg-neutral-200 bg-opacity-70 w-[30%] h-[23%] flex items-center justify-center gap-3"
        >
          <FaKitchenSet className="text-3xl" />
          <p>Kitchen</p>
        </Link>
        <Link
          to=""
          className="  flex-col bg-neutral-200 bg-opacity-70 w-[30%] h-[23%] flex items-center justify-center gap-3"
        >
          <MdHealthAndSafety className="text-3xl" />
          <p>Health</p>
        </Link>
      </div>
    </div>
  );
};
export default CategoryTab;
