import { addCartReq, addCartSuccess } from "../slices/cartSlice";
import axios from "axios";

export const addCartItem = (id, quantity) => async (dispatch) => {
  try {
    dispatch(addCartReq());
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch(
      addCartSuccess({
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        file: data.product.files[0].fileName,
        stock: data.product.stock,
        quantity,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
