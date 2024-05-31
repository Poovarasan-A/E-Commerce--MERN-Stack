import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { completeOrder } from "../../slices/cartSlice";
import { useEffect, useMemo } from "react";
import { validateShipping } from "./ShippingDetails";
import { clearOrderError } from "../../slices/orderSlice";
import { createOrder } from "../../actions/orderAction";

const ProductPayment = () => {
  const { items: cartItems, shippingInfo = {} } = useSelector(
    (state) => state.cartState
  );
  const { user } = useSelector((state) => state.authState);
  const { error: orderError } = useSelector((state) => state.orderState);

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInformation"));
  const paymentData = {
    amount: Math.round(orderInfo.totalCost * 100),
    shipping: {
      name: shippingInfo.name || "",
      address: {
        city: shippingInfo.city || "",
        postal_code: shippingInfo.postalCode || "",
        country: shippingInfo.country || "",
        state: shippingInfo.state || "",
        line1: shippingInfo.address || "",
      },
    },
  };

  const order = useMemo(() => {
    return {
      orderItems: cartItems,
      shippingInfo,
    };
  }, [cartItems, shippingInfo]);

  if (orderInfo) {
    order.itemsCost = orderInfo.itemsCost;
    order.shippingCost = orderInfo.shippingCost;
    order.taxCost = orderInfo.taxCost;
    order.totalCost = orderInfo.totalCost;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;
    try {
      const { data } = await axios.post("/api/v1/payment/process", paymentData);
      const clientSecret = data.client_secret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message, {
          position: "top-center",
        });
        document.querySelector("#pay_btn").disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          toast.success("Payment Success!", {
            position: "top-center",
          });
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(completeOrder());
          dispatch(createOrder(order));
          navigate("/success/order");
        } else {
          toast.warning("Please Try again!", {
            position: "top-center",
          });
          document.querySelector("#pay_btn").disabled = false;
        }
      }
    } catch (error) {
      toast.error("Payment failed, please try again!", {
        position: "top-center",
      });
      document.querySelector("#pay_btn").disabled = false;
    }
  };

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
    if (orderError) {
      toast.error(orderError, {
        position: "top-center",
        onOpen: () => {
          dispatch(clearOrderError(order));
        },
      });
      return;
    }
  }, [dispatch, navigate, orderError, shippingInfo, order]);

  return (
    <div className="px-20 pt-[4rem]">
      <div className="w-[100%] h-screen">
        <hr />
        <div className="w-full flex">
          {/* Card Design */}
          <div className="w-[60%] px-10 pt-5">
            <h2 className="font-bold text-2xl my-4 text-start">
              Payment Details
            </h2>
            <hr />
            <div>
              <h2 className="font-bold text-xl my-4 text-start">
                Your Shipping Address
              </h2>
              {/* Shipping info */}
              <div className="flex flex-col gap-2 ml-5 pb-5">
                <div className="flex">
                  <p className="font-semibold">Name:&nbsp; </p>
                  <span> {shippingInfo.name}</span>
                </div>
                <div className="flex">
                  <p className="font-semibold">Phone Number:&nbsp; </p>
                  <span> {shippingInfo.phoneNo}</span>
                </div>
                <div className="flex ">
                  <p className="font-semibold">Address:&nbsp; </p>
                  <span>
                    {shippingInfo.address}, {shippingInfo.city},
                    {shippingInfo.state}, {shippingInfo.country}-
                    {shippingInfo.postalCode}
                  </span>
                </div>
              </div>
              {/* Products */}
              <hr />
              <h2 className="font-bold text-xl my-4 text-start">
                Product you placing order
              </h2>
              <div className="pl-5">
                {cartItems.map((item, index) => (
                  <div className="flex flex-col justify-between" key={index}>
                    <div className="w-full flex justify-between py-6">
                      <div className="w-[40%] flex gap-4">
                        <img
                          src={`http://localhost:8000/images/${item.file}`}
                          className="border-2 border-gray-400"
                          width={100}
                          height={100}
                          alt={item.name}
                        />
                        <div className="h-full flex flex-col items-start">
                          <Link to="">{item.name}</Link>
                          <p>Qty : {item.quantity}</p>
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <p>Rs.{item.price}</p>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Input Design */}
          <div className="w-[40%] h-full flex flex-col justify-center pt-5">
            <h2 className="font-bold text-2xl my-4 text-start">Card Details</h2>
            <hr />
            <form onSubmit={submitHandler} className="w-full py-4">
              <div className="flex flex-col py-2">
                <label htmlFor="name">Name on your card</label>
                <input
                  type="text"
                  className="border-b-2 py-2 outline-none border-gray-500"
                  placeholder="Name"
                />
              </div>
              <div className="flex flex-col py-2">
                <label htmlFor="cardNo">
                  Enter the 16 digit number on the card
                </label>
                <CardNumberElement
                  type="number"
                  className="border-b-2 py-3 tracking-wider outline-none border-gray-500"
                />
              </div>
              <div className="flex py-2 gap-20 w-full">
                <div className="flex flex-col w-[50%]">
                  <label htmlFor="date">Exp Date</label>
                  <CardExpiryElement
                    type="number"
                    className="border-b-2 py-2 outline-none border-gray-500"
                  />
                </div>
                <div className="flex flex-col w-[50%]">
                  <label htmlFor="cvv">CVV</label>
                  <CardCvcElement
                    type="number"
                    className="border-b-2 py-2 outline-none border-gray-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                id="pay_btn"
                className="text-white float-right hover:bg-slate-700 bg-slate-800 rounded-3xl w-[15rem] py-2 mt-10"
              >
                Pay - {`Rs.${orderInfo && orderInfo.totalCost}`}
              </button>
            </form>
            <hr />
            {/* cod */}
            <div className="w-full h-[8rem] rounded-lg border-2 border-gray-400 my-4 p-6">
              <div className="flex gap-8">
                <div>
                  <div className="flex gap-2">
                    <input type="radio" id="cod" />
                    <label htmlFor="cod">COD</label>
                  </div>
                  <p className="text-gray-400 text-sm">cash on delivery</p>
                </div>
                <div>
                  <div className="flex-gap-4">
                    <input type="radio" id="cod" />
                    <label htmlFor="cod" className="pl-2">
                      BHIM/UPI
                    </label>
                  </div>
                  <p className="text-gray-400 text-sm">
                    You can pay through Paytm, Phonepe, google pay, and UPI
                    through all the major banks.
                  </p>
                </div>
                <button
                  type="submit"
                  className="text-white float-right hover:bg-slate-700 bg-slate-800 rounded-3xl w-[13rem] py-2 h-[3rem] "
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPayment;
