import Loader from "../layouts/Loader";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { deleteProduct, getAdminProducts } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProductDeleted,
  clearProductErr,
} from "../../slices/productSlice";
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";
import { TbFilePencil } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

const ListProducts = () => {
  const {
    products = [],
    loading = true,
    error,
  } = useSelector((state) => state.productsState);
  const { isProductDeleted, error: productError } = useSelector(
    (state) => state.productState
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error || productError) {
      toast.error(error || productError, {
        position: "top-center",
        onOpen: () => {
          dispatch(clearProductErr());
        },
      });
      return;
    }
    if (isProductDeleted) {
      toast.success("Product Deleted Succesfully!", {
        position: "top-center",
        onOpen: () => dispatch(clearProductDeleted()),
      });
      navigate("/admin/products");
      return;
    }

    dispatch(getAdminProducts);
  }, [dispatch, error, isProductDeleted, productError, navigate]);

  return (
    <div className="w-full h-full flex justify-center items-center bg-neutral-200 bg-opacity-60">
      <div>
        <Sidebar />
      </div>
      <div className="w-full px-10">
        <div className="w-full flex justify-between items-center">
          <h2 className="my-5 text-2xl pl-2 pt-2 font-bold">Product List</h2>
          <Link
            to="/admin/products/add"
            className="border-2 border-green-500 rounded-md flex items-center gap-2 py-1 px-2 text-green-500 hover:bg-green-200 mr-20"
          >
            <span className="text-xl">+</span> Add Product
          </Link>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className=" w-full h-screen pb-5">
            {/* Headings */}
            <div className="w-full flex items-center text-gray-600 pt-2 pb-5">
              <b className="bg-neutral-200 w-[5%] py-2 pl-4">#</b>
              <b className="bg-neutral-200 w-[15%] py-2 pl-8">Image</b>
              <b className="bg-neutral-200 w-[25%] py-2 pl-4">Name</b>
              <b className="bg-neutral-200 w-[14%] py-2">Price</b>
              <b className="bg-neutral-200 w-[11%] py-2 ">Stock</b>
              <b className="bg-neutral-200 w-[15%] py-2">Seller</b>
              <b className="bg-neutral-200 w-[15%] py-2 pl-10">Actions</b>
            </div>
            <hr />
            {products.map((product, index) => {
              const productImage =
                product.files.length > 0
                  ? `http://localhost:8000/images/${product.files[0].fileName}`
                  : "";
              return (
                <div
                  className="w-full h-[4rem] flex items-center mt-2 gap-1 px-4 bg-white"
                  key={index}
                >
                  <div className="w-[5%]">
                    <h2>{index + 1}</h2>
                  </div>
                  <div className="w-[15%]">
                    <div className="w-[3rem] h-[3rem] flex items-center justify-center">
                      <img
                        width={80}
                        height={80}
                        src={productImage}
                        alt={product.name}
                      />
                    </div>
                  </div>
                  <div className="w-[25%] font-semibold">
                    <h2>{product.name}</h2>
                  </div>
                  <div className="w-[15%] ">
                    <h2>{product.price}</h2>
                  </div>
                  <div className="w-[10%] ">
                    <h2>{product.stock}</h2>
                  </div>
                  <div className="w-[15%] ">
                    <h2>{product.seller}</h2>
                  </div>
                  <div className="w-[15%] flex gap-20 text-xl ">
                    <Link
                      to={`/admin/products/update/${product._id}`}
                      className="bg-blue-500 bg-opacity-20 text-blue-500 p-2 rounded-full"
                    >
                      <TbFilePencil />
                    </Link>
                    <button
                      onClick={(e) => deleteHandler(e, product._id)}
                      className="bg-red-500 bg-opacity-20 text-red-500 p-2 rounded-full"
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default ListProducts;
