import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";
import { MdDeleteOutline } from "react-icons/md";
import { deleteUser, getUsers } from "../../actions/authAction";
import { clearUserDeleted, clearUserError } from "../../slices/userSlice";
import { Link } from "react-router-dom";
import { TbFilePencil } from "react-icons/tb";

const ListUser = () => {
  const {
    users = [],
    loading = true,
    error,
    isUserDeleted,
  } = useSelector((state) => state.userState);

  const dispatch = useDispatch();

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        onOpen: () => {
          dispatch(clearUserError());
        },
      });
      return;
    }
    if (isUserDeleted) {
      toast.success("User Deleted Succesfully!", {
        position: "top-center",
        onOpen: () => dispatch(clearUserDeleted()),
      });
      return;
    }

    dispatch(getUsers);
  }, [dispatch, error, isUserDeleted]);

  return (
    <div className="w-full h-full flex justify-center items-center bg-neutral-200 bg-opacity-60">
      <div>
        <Sidebar />
      </div>
      <div className="w-full px-10">
        <h2 className="my-5 text-2xl pl-2 pt-2 font-bold">Product List</h2>
        {loading ? (
          <Loader />
        ) : (
          <div className=" w-full pb-5">
            {/* Headings */}
            <div className="w-full flex items-center text-gray-600 pt-2 pb-5">
              <b className="bg-neutral-200 w-[5%] py-2 pl-4">#</b>
              <b className="bg-neutral-200 w-[7%] py-2 pl-4">User</b>
              <b className="bg-neutral-200 w-[20%] py-2 pl-4">Username</b>
              <b className="bg-neutral-200 w-[34%] py-2 pl-10">Email</b>
              <b className="bg-neutral-200 w-[12%] py-2 ">Role</b>
              <b className="bg-neutral-200 w-[12%] py-2 ">Joined on</b>
              <b className="bg-neutral-200 w-[15%] py-2 pl-5">Actions</b>
            </div>
            <hr />
            {users.map((user, index) => {
              const avatar =
                user.files.length > 0
                  ? `http://localhost:8001/images/${user.files[0].fileName}`
                  : "/images/default_avatar.png";

              return (
                <div
                  className="w-full flex items-center mt-2 gap-1 px-4 py-3 bg-white"
                  key={index}
                >
                  <div className="w-[5%]">
                    <h2>{index + 1}</h2>
                  </div>
                  <div className="w-[7%] rounded-full">
                    <img
                      className="rounded-full"
                      src={avatar}
                      width={40}
                      height={40}
                      alt="User"
                    />
                  </div>
                  <div className="w-[20%]">
                    <h2>{user.name}</h2>
                  </div>
                  <div className="w-[34%]">
                    <h2>{user.email}</h2>
                  </div>
                  <div
                    className={`w-[12%] ${
                      user.role === "admin" ? "text-green-600" : "text-blue-600"
                    } capitalize`}
                  >
                    <h2>{user.role}</h2>
                  </div>
                  <div className="w-[12%] capitalize">
                    <h2>Since {String(user.createdAt).substring(0, 4)}</h2>
                  </div>
                  <div className="w-[15%] flex gap-14 text-xl">
                    <Link
                      to={`/admin/user/${user._id}`}
                      className="bg-blue-500 bg-opacity-20 text-blue-500 p-2 rounded-full"
                    >
                      <TbFilePencil />
                    </Link>
                    <button
                      onClick={(e) => deleteHandler(e, user._id)}
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
export default ListUser;
