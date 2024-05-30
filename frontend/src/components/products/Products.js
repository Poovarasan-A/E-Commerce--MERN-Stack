import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { FaStar } from "react-icons/fa6";

const Products = ({ product }) => {
  const [productImage, setProductImage] = useState("");
  useEffect(() => {
    if (product) {
      if (product.files && product.files[0] && product.files[0].fileName) {
        setProductImage(
          `http://localhost:8000/images/${product.files[0].fileName}`
        );
      } else {
        setProductImage("");
      }
    }
  }, [product]);

  return (
    <div>
      <section className="bg-white shadow-sm  box-border overflow-hidden whitespace-nowrap w-[11rem] md:w-[12rem] lg:w-[14rem] rounded-lg my-1 lg:my-3 flex flex-col items-center gap-1 lg:gap-3">
        <div className="lg:w-[14rem] lg:h-[14rem]">
          <img width={225} height={225} src={productImage} alt={product.name} />
        </div>

        <div className="flex flex-col w-full items-center text-sm lg:text-md">
          <p className="font-semibold w-[8rem] lg:w-[12rem] text-sm lg:text-md text-center lg:truncate truncate">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </p>
          <div className="flex  w-[9rem] lg:px-2 pb-5 mt-3 justify-between  lg:w-[12rem]">
            <h5 className="text-sm">
              {product.ratings} ({product.numOfReviews})
            </h5>
            <h5 className="font-semibold">Rs.{product.price}</h5>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Products;
