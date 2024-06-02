import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { FaStar } from "react-icons/fa6";

const Products = ({ product }) => {
  const [productImage, setProductImage] = useState("");
  const baseURL = process.env.BACKEND_URL;
  useEffect(() => {
    if (product) {
      if (product.files && product.files[0] && product.files[0].fileName) {
        setProductImage(
          // `http://localhost:8001/images/${product.files[0].fileName}`
          `${baseURL}/images/${product.files[0].fileName}`
        );
      } else {
        setProductImage("");
      }
    }
  }, [product, baseURL]);

  return (
    <div>
      <section className="  box-border overflow-hidden whitespace-nowrap w-[11rem] md:w-[12rem] lg:w-[14rem] my-1 lg:my-3 flex flex-col items-center gap-1 lg:gap-3">
        <div className="lg:w-[14rem] bg-white lg:h-[16rem] flex items-center justify-center">
          <img width={180} height={180} src={productImage} alt={product.name} />
        </div>

        <div className="flex flex-col w-full items-center text-sm lg:text-md">
          <p className=" w-[8rem] lg:w-[12rem] text-sm lg:text-md text-center font-bold lg:truncate truncate">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </p>
          <div className="flex  w-[9rem] lg:px-2 pb-5 mt-2 justify-center  lg:w-[12rem]">
            <h5 className="font-semibold text-gray-700">Rs.{product.price}</h5>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Products;
