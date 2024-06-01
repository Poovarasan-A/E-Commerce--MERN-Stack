import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  decreaseCartQty,
  increaseCartQty,
  removeItemInCart,
} from "../../slices/cartSlice";
import CheckoutPage from "./CheckoutPage";

const Cart = () => {
  const { items } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();

  const increaseQty = (item) => {
    const count = item.quantity;
    if (item.stock === 0 || count >= item.stock) {
      return;
    }
    dispatch(increaseCartQty(item.product));
  };

  const decreaseQty = (item) => {
    const count = item.quantity;
    if (count === 1) {
      return;
    }
    dispatch(decreaseCartQty(item.product));
  };

  const handleQuantityChange = (e, item) => {
    const newQuantity = e.target.value;
    if (newQuantity > 0 && newQuantity <= item.stock) {
    }
  };

  return (
    <div className="w-[100%] h-full relative">
      {items.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          <h2 className="text-xl font-semibold text-center ">
            Your Cart is Empty
          </h2>
        </div>
      ) : (
        <div className="flex w-[100%] h-full">
          <div className="w-[75%] pl-10 pt-5">
            <div className="flex justify-between pr-20">
              <h2 className="font-bold text-2xl my-4">Shopping Cart</h2>
              <h2 className="font-bold text-2xl my-4">{items.length} Items</h2>
            </div>
            <hr />
            <div className="text-gray-400 w-full flex justify-between pt-5">
              <h5 className="w-[40%] text-start">PRODUCT DETAILS</h5>
              <h5 className="w-[20%] text-center">QUANTITY</h5>
              <h5 className="w-[20%] text-center">PRICE</h5>
              <h5 className="w-[20%] text-center">TOTAL</h5>
            </div>
            {items.map((item, index) => {
              return (
                <div className="flex flex-col " key={index}>
                  <div className="w-full flex py-6">
                    <div className="w-[40%] flex items-center gap-4">
                      <img
                        src={`http://localhost:8001/images/${item.file}`}
                        className="border-2 border-gray-400"
                        width={100}
                        height={100}
                        alt={item.name}
                      />
                      <div className="h-full flex flex-col items-start justify-between">
                        <Link to="">{item.name}</Link>
                        <p>{item.category}</p>
                        <button
                          className="text-gray-500 font-semibold"
                          onClick={() =>
                            dispatch(removeItemInCart(item.product))
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="w-[20%] flex items-center justify-center">
                      <div className="w-[6rem] flex border-2 border-slate-800">
                        <button
                          className="bg-slate-800 text-white text-xl font-semibold px-2 cursor-pointer"
                          onClick={() => decreaseQty(item)}
                        >
                          -
                        </button>
                        <input
                          className="w-full outline-none text-center"
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(e, item)}
                        />
                        <button
                          className="bg-slate-800 text-white text-xl font-semibold px-2 cursor-pointer"
                          onClick={() => increaseQty(item)}
                          disabled={item.stock === 0}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="w-[20%] flex justify-center items-center">
                      <p>{item.price}</p>
                    </div>
                    <div className="w-[20%] flex justify-center items-center">
                      <p>Rs. {(item.quantity * item.price).toFixed(2)}</p>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
          <div className="w-[25%] bg-slate-300 h-full px-8 pt-5 fixed top-[4rem] right-0">
            <CheckoutPage />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
