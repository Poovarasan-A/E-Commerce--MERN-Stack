import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/authAction";
import { clearUpdateUser } from "../../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.png"
  );
  const { user, error, isUpdated } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setAvatar(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("files", avatar);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar);
      setCreatedAt(user.createdAt);
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully", {
        position: "top-center",
        onOpen: () => dispatch(clearUpdateUser()),
      });
      navigate("/myprofile");
      return;
    }
    if (error) {
      toast.error(error, {
        position: "top-center",
      });
      return;
    }
  }, [user, isUpdated, error, dispatch, navigate]);
  return (
    <Fragment>
      <div className="w-full h-full p-8 bg-white">
        <h2 className="font-bold text-2xl">Update Profile</h2>
        <form onSubmit={submitHandler} className="flex pt-10">
          <div className="w-[30%] flex flex-col items-center justify-center">
            <div className="w-[15rem] h-[15rem] rounded-full object-cover bg-white">
              <img
                src={avatarPreview}
                className="rounded-full object-cover w-[15rem] h-[15rem]"
                alt=""
              />
            </div>
            <div className="pt-10 flex flex-col gap-5">
              <input name="avatar" type="file" onChange={onChangeAvatar} />

              <button
                type="submit"
                className=" bg-orange-500 text-white font-semibold text-lg py-2 px-8 rounded-sm hover:bg-orange-400"
              >
                Update Profile
              </button>
              <Link
                to="/change/password"
                className=" bg-blue-500 text-white font-semibold text-lg py-2 px-8 rounded-sm hover:bg-blue-400"
              >
                Change Password
              </Link>
            </div>
          </div>
          <div className="w-[30%] px-5">
            <div className="flex flex-col mb-8">
              <label className="font-semibold text-lg mb-2">Name</label>
              <input
                type="name"
                className="capitalize py-2 px-2  w-[18rem] border-2 border-gray-600"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="flex flex-col my-8">
              <label className="font-semibold text-lg mb-2">Email</label>
              <input
                type="email"
                className="py-2 px-2 w-[18rem] border-2 border-gray-600"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                value={email}
              />
            </div>
            <div className="flex flex-col my-10">
              <label className="font-semibold text-lg text-gray-500">
                Joined on
              </label>

              <h5 className="capitalize pt-1 text-gray-500">
                Since {String(createdAt).substring(0, 4)}
              </h5>
            </div>
            <div>
              <button className=" bg-slate-600 text-white font-semibold text-lg py-2 px-8 rounded-sm hover:bg-slate-700">
                My Orders
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
export default MyProfile;
