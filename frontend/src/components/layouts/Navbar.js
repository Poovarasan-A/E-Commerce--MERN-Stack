import Search from "./Search";
import { MdShoppingCart } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logout } from "../../actions/authAction";
import toast from "react-hot-toast";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items: cartItems } = useSelector((state) => state.cartState);
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const profileHandler = () => {
    setOpen(!open);
  };

  const logoutHandler = () => {
    dispatch(logout);
    toast.success("LoggedOut Successfully !", { position: "top-center" });
  };

  const hiddenNavbarPaths = [
    "/login",
    "/register",
    "/checkout",
    "/admin/dashboard",
    "/admin/products",
    "/admin/products/add",
    "/admin/products/update/:id",
    "/admin/orders",
    "/admin/order/:id",
    "/admin/users",
    "/admin/user/:id",
  ];

  const matchPath = (path, pathname) => {
    const pathRegex = new RegExp(`^${path.replace(/:\w+/g, "\\w+")}$`);
    return pathRegex.test(pathname);
  };

  const isNavbarHidden = hiddenNavbarPaths.some((path) =>
    matchPath(path, location.pathname)
  );

  useEffect(() => {
    if (user) {
      if (user.files && user.files[0] && user.files[0].fileName) {
        setAvatar(`http://localhost:8001/images/${user.files[0].fileName}`);
      } else {
        setAvatar("/images/default_avatar.png");
      }
    }
  }, [user]);

  if (isNavbarHidden) {
    return null;
  }

  return (
    <div className="bg-slate-500 w-full px-4 py-2 lg:h-[4.5rem] h-[6.5rem] top-0 pb-4 items-center fixed z-10 justify-around flex flex-col lg:flex-row md:flex-row gap-3 ">
      <Link to="/">
        <img
          className="cursor-pointer w-[7rem] lg:w-[10rem] md:w-[9rem]"
          src="/images/whitelogo.png"
          alt="wolfkart logo"
        />
      </Link>

      <select className="hidden lg:block w-[10rem] bg-transparent outline-none font-semibold cursor-pointer">
        <option>All Categories</option>
        <option>Mobile Phones</option>
        <option>Electronics</option>
        <option>Clothes</option>
        <option>Laptops</option>
        <option>Accessories</option>
        <option>Books</option>
        <option>Beauty/Health</option>
        <option>Sports</option>
        <option>Outdoor</option>
        <option>Home</option>
        <option>Shoes</option>
      </select>
      <div className="flex items-center justify-between lg:w-[45rem] gap-2 md:gap-7">
        <Search />
        <Link to="/cart" className="relative">
          <MdShoppingCart className="text-3xl cursor-pointer lg:ml-1 ml-4 hover:text-gray-800" />
          <span className="absolute w-5 h-5 flex items-center justify-center bottom-5 left-8 bg-white rounded-full">
            {cartItems.length}
          </span>
        </Link>
      </div>
      <FaHeart className="hidden lg:block text-2xl cursor-pointer hover:text-red-600" />
      {user && isAuthenticated ? (
        <Link to="/myprofile">
          <h4 className="hidden lg:block text-lg font-semibold capitalize select-none">
            Hi, {user.name}
          </h4>
        </Link>
      ) : (
        <button
          type="submit"
          className="bg-slate-800 text-white w-[6rem] h-[2.2rem] px-3 py-1 rounded-2xl"
        >
          <Link to="/login">Login</Link>
        </button>
      )}
      {/* profile */}
      {isAuthenticated ? (
        <div className="hidden lg:flex items-center h-full w-[6rem] gap-1 relative cursor-pointer">
          <div className="w-[2.5rem] h-[2.5rem] rounded-full hover:border-2 border-white">
            <img className="rounded-full" src={avatar} alt="user" />
          </div>
          {open ? (
            <IoMdArrowDropup
              className="text-xl hover:text-2xl"
              onClick={profileHandler}
            />
          ) : (
            <IoMdArrowDropdown
              className="text-xl hover:text-2xl"
              onClick={profileHandler}
            />
          )}

          {open ? (
            <div className="absolute top-[4rem] right-[-35px] flex flex-col justify-center items-center bg-slate-200 w-[15rem] z-10 mb-2 shadow-md rounded-bl-md">
              {user.role === "admin" && (
                <div
                  className=" w-full flex justify-center items-center font-semibold hover:text-orange-500 hover:bg-white hover:bg-opacity-70 py-2"
                  onClick={() => {
                    navigate("/admin/dashboard");
                    profileHandler();
                  }}
                >
                  <p>Dashboard</p>
                </div>
              )}
              <div
                className="py-2 w-full flex justify-center items-center font-semibold hover:text-blue-600 hover:bg-blue-500 hover:bg-opacity-20"
                onClick={() => {
                  navigate("/myprofile");
                  profileHandler();
                }}
              >
                <p>My Profile</p>
              </div>

              <div
                className=" w-full flex justify-center items-center font-semibold hover:text-red-600 hover:bg-red-500 hover:bg-opacity-20 py-2"
                onClick={() => {
                  logoutHandler();
                  profileHandler();
                }}
              >
                <p>Logout</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Navbar;
