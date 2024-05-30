import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/authAction";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.authState
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(getUser(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success(`Welcome ${user.name} !`, {
        position: "top-center",
      });
      navigate("/");
    }
    if (error) {
      toast.error(error, {
        position: "top-center",
      });
    }
    return;
  }, [error, isAuthenticated, navigate, user]);
  return (
    <Fragment>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[50%] h-full ml-10">
          <img
            className="bg-cover"
            src="/images/Wolfkart-login-page.jpg"
            alt=""
          />
        </div>
        <div className="w-[50%] h-full flex items-center justify-center bg-white">
          <div className="bg-white w-[25rem] h-[28rem] flex items-center justify-center rounded-md z-50">
            <form
              onSubmit={loginHandler}
              className="flex flex-col w-[20rem] gap-5 mr-20"
            >
              <h2 className="text-2xl font-bold">LOGIN</h2>
              <input
                className="h-[3rem] p-2 my-2 border-2 border-black"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="h-[3rem] p-2 my-2 border-2 border-black"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-slate-800 h-[3rem] text-white text-lg hover:bg-slate-600"
              >
                Login
              </button>
              <Link
                to="/forgot/password"
                className="text-blue-900 hover:text-blue-500"
              >
                Forgot Password?
              </Link>
              <Link to="/register" className="flex gap-2">
                New User?
                <p className="text-blue-900 hover:text-blue-500">
                  Create Account
                </p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Login;
