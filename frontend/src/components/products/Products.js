import { Link } from "react-router-dom";
// import { FaStar } from "react-icons/fa6";

const Products = ({ product }) => {
  return (
    <div>
      <Link
        to={`/product/${product._id}`}
        className="  box-border overflow-hidden whitespace-nowrap max-xs:w-[10rem]   max-sm:w-[11rem] max-md:w-[11rem] max-lg:w-[13rem] w-[11rem] lg:h-[16rem] my-1 lg:my-3 flex flex-col items-center gap-1 lg:gap-3 bg-white rounded-md shadow-sm"
      >
        <div className="lg:w-[12rem] max-xs:w-[9rem] max-sm:w-[11rem] bg-white flex items-center justify-center lg:h-[14rem] h-[10rem]">
          <img
            className="max-lg:w-[9rem] max-sm:w-[7rem] max-xs:w-[8rem] max-md:w-[8rem] w-[8rem]"
            src={product.images[0].image}
            alt={product.name}
          />
        </div>

        <div className="flex flex-col w-full items-center text-sm lg:text-md">
          <p className=" w-[8rem] lg:w-[10rem] text-sm lg:text-md text-center font-bold truncate">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </p>
          <div className="flex  w-[9rem] lg:px-2 pb-5 mt-2 justify-center  lg:w-[12rem]">
            <h5 className="font-semibold text-gray-700">Rs.{product.price}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default Products;
