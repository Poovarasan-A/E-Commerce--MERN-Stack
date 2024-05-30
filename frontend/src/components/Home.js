import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../actions/productsAction";
import Products from "./products/Products";
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
// import ReactPaginate from "react-paginate";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productsState
  );

  useEffect(() => {
    dispatch(getAllProducts(null, null, null, null));
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Home"} />
          <div className=" my-2 w-full flex flex-col box-border pt-[6rem] lg:pt-[4rem] bg-neutral-200 bg-opacity-70 overflow-x-hidden">
            <h2 className="font-bold text-2xl ml-5 lg:ml-10 my-3">
              Explore Products
            </h2>
            <div className="w-full h-full flex flex-wrap justify-center gap-5">
              {products &&
                products.map((product) => (
                  <Products key={product._id} product={product} />
                ))}
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};
export default Home;
