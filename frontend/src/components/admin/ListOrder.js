import Loader from "../layouts/Loader";
import { useEffect } from "react";
import Sidebar from "./Sidebar";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import toast from "react-hot-toast";
import {
  deleteOrder,
  adminOrders as adminOrdersAction,
} from "../../actions/orderAction";
import { clearOrderDeleted, clearOrderError } from "../../slices/orderSlice";
import { MdDeleteOutline } from "react-icons/md";
import { TbFilePencil } from "react-icons/tb";

const ListOrder = () => {
  const {
    adminOrders = [],
    loading = true,
    error,
    isOrderDeleted,
  } = useSelector((state) => state.orderState);

  const dispatch = useDispatch();

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        onOpen: () => {
          dispatch(clearOrderError());
        },
      });
      return;
    }
    if (isOrderDeleted) {
      toast.success("Order Deleted Succesfully!", {
        position: "top-center",
        onOpen: () => dispatch(clearOrderDeleted()),
      });
      dispatch(clearOrderDeleted());
      return;
    }

    dispatch(adminOrdersAction);
  }, [dispatch, error, isOrderDeleted]);

  return (
    <div className="w-full h-full flex justify-center items-center bg-neutral-200 bg-opacity-60">
      <div>
        <Sidebar />
      </div>
      <div className="w-full px-10">
        <h2 className="my-5 text-2xl pl-2 pt-2 font-bold">Orders List</h2>
        {loading ? (
          <Loader />
        ) : (
          <div className=" w-full h-screen pb-5">
            {/* Headings */}
            <div className="w-full flex items-center text-gray-600 pt-2 pb-5">
              <b className="bg-neutral-200 w-[5%] py-2 pl-4">#</b>
              <b className="bg-neutral-200 w-[23%] py-2">Product Name</b>
              <b className="bg-neutral-200 w-[17%] py-2">No.of.Items</b>
              <b className="bg-neutral-200 w-[14%] py-2 ">Order Price</b>
              <b className="bg-neutral-200 w-[21%] py-2">Order Status</b>
              <b className="bg-neutral-200 w-[20%] py-2 pl-10">Actions</b>
            </div>
            <hr />
            {adminOrders.map((order, index) => (
              <div
                className="w-full flex items-center mt-2 gap-1 px-4 py-4 bg-white"
                key={index}
              >
                <div className="w-[5%]">
                  <h2>{index + 1}</h2>
                </div>

                <div className="w-[25%] font-semibold">
                  {order.orderItems.map((item, index) => (
                    <h2 key={index}>{item.name}</h2>
                  ))}
                </div>
                <div className="w-[15%]">
                  <h2>{order.orderItems.length}</h2>
                </div>
                <div className="w-[15%] ">
                  <h2>₹ {order.totalPrice}</h2>
                </div>
                <div
                  className={`w-[20%] ${
                    order.orderStatus === "Shipped"
                      ? "text-blue-600"
                      : "text-black"
                  } ${
                    order.orderStatus === "Delivered"
                      ? "text-green-600"
                      : "text-black"
                  }
                  ${
                    order.orderStatus === "Processing"
                      ? "text-orange-500"
                      : "text-black"
                  } `}
                >
                  <h2>{order.orderStatus}</h2>
                </div>

                <div className="w-[20%] flex gap-20 text-xl ">
                  <Link
                    to={`/admin/order/${order._id}`}
                    className="bg-blue-500 bg-opacity-20 text-blue-500 p-2 rounded-full"
                  >
                    <TbFilePencil />
                  </Link>
                  <button
                    onClick={(e) => deleteHandler(e, order._id)}
                    className="bg-red-500 bg-opacity-20 text-red-500 p-2 rounded-full"
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ListOrder;
