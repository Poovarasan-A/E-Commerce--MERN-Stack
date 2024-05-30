import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewProduct } from "../../actions/productAction";
import toast from "react-hot-toast";

import {
  clearProductCreated,
  clearProductErr,
} from "../../slices/productSlice";
import Sidebar from "./Sidebar";

const AddNewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [productImage, setProductImage] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);

  const { isProductCreated, error } = useSelector(
    (state) => state.productState
  );

  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const onImageChange = (e) => {
  //   setProductImage(e.target.files[0]);
  // };

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          // setProductImage((oldArray) => [...oldArray, file]);
        }
      };

      reader.readAsDataURL(file);
    });
    setProductImage(e.target.files);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      name,
      price,
      description,
      category,
      seller,
      stock,
    };
    const imageData = new FormData();
    for (let i = 0; i < productImage.length; i++) {
      imageData.append(`files${i}`, productImage[i]);
    }
    console.log(imageData.getAll("files"));
    dispatch(addNewProduct(formData, imageData));
  };

  useEffect(() => {
    if (isProductCreated) {
      toast.success("Product Created Successfully !", {
        position: "top-center",
        onOpen: () => dispatch(clearProductCreated()),
      });
      navigate("/admin/products");
      return;
    }
    if (error) {
      toast.error(error, {
        position: "top-center",
        onOpen: () => dispatch(clearProductErr()),
      });
      return;
    }
  }, [isProductCreated, dispatch, error, navigate]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Sidebar />
      <div className="w-full px-10">
        <h2 className="my-5 text-2xl pl-2 pt-2 font-bold">Add New Product</h2>
        <form onSubmit={submitHandler} className="flex w-full gap-8">
          {/* First Col */}
          <div className="w-[50%]">
            <b className="text-lg">Description</b>
            <div className="p-5 my-4 border-2  border-gray-200 rounded-lg">
              {/* Product Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="productName" className="text-gray-400">
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  className="border-2 px-2 py-2 border-gray-500 rounded-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {/* Product Description */}
              <div className="flex flex-col gap-2 pt-2">
                <label htmlFor="productDesc" className="text-gray-400">
                  Product Description
                </label>
                <textarea
                  type="text"
                  id="productDesc"
                  className="border-2 px-2 py-1 resize-none h-28  border-gray-500 rounded-sm"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            {/* Category */}
            <b className="text-lg">Category & Stock</b>
            <div className="p-5 my-4 border-2 w-full  border-gray-200 rounded-lg">
              <div className="flex flex-col gap-2 pt-2">
                <label htmlFor="category" className="text-gray-400">
                  Product Category
                </label>
                <select
                  className="border-2 px-2 py-2 w-full  border-gray-500 rounded-sm"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Select Product Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <label htmlFor="stock" className="text-gray-400">
                  Quantity
                </label>
                <input
                  className="border-2 px-2 py-2 w-full  border-gray-500 rounded-sm"
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* Second Col */}
          <div className="w-[50%]">
            {/* Price */}
            <b className="text-lg">Price & Seller</b>
            <div className="p-5 my-4 border-2 w-full  border-gray-200 rounded-lg">
              <div className="flex flex-col gap-2 pt-2">
                <label htmlFor="category" className="text-gray-400">
                  Product Price
                </label>
                <input
                  className="border-2 px-2 py-2 w-full  border-gray-500 rounded-sm"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <label htmlFor="stock" className="text-gray-400">
                  Seller Name
                </label>
                <input
                  className="border-2 px-2 py-2 w-full  border-gray-500 rounded-sm"
                  type="text"
                  value={seller}
                  onChange={(e) => setSeller(e.target.value)}
                />
              </div>
            </div>
            <b className="text-lg">Product Images</b>
            <div className="p-5 my-4 border-2 w-full flex gap-4  border-gray-200 rounded-lg">
              <div className="w-[8rem] h-[8rem] flex flex-col items-center justify-center border-2 rounded-md border-dashed border-gray-300">
                <input
                  type="file"
                  className="text-blue-500 text-sm underline"
                  accept="image/*"
                  multiple
                  onChange={onImagesChange}
                />
                <p className="text-xs text-gray-400 pt-1">jpeg, jpg or png</p>
              </div>
              <div className="flex gap-2 border-2 border-gray-300">
                {imagesPreview.map((image) => (
                  <img
                    key={image}
                    src={image}
                    alt={""}
                    width={130}
                    height={130}
                  />
                ))}
              </div>
            </div>
            {/* Buttons */}
            <div className="flex gap-20 px-1 mt-10">
              <button
                type="submit"
                className="bg-slate-800 py-2 rounded-md w-full text-white"
              >
                Add
              </button>
              <button
                type=""
                className="border-2 border-slate-800 py-2 rounded-md w-full text-slate-800"
              >
                Discard
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddNewProduct;
