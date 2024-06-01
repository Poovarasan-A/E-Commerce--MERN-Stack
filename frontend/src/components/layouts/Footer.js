import { RiInstagramFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { BsStripe } from "react-icons/bs";
const Footer = () => {
  return (
    <div className="bg-[#262626] flex flex-col text-neutral-300 pt-10">
      <div className="flex w-full justify-between px-10">
        <div className="flex gap-4 text-2xl cursor-pointer">
          <RiInstagramFill />
          <FaGithub />
          <IoLogoLinkedin />
        </div>
        <div>
          <img src="/images/whitelogo.png" className="w-[7rem]" alt="logo" />
        </div>
        <div className="flex gap-2  items-center">
          <BsStripe className="text-2xl" />
          <p>Stripe</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-center gap-10 py-14 text-xs tracking-widest cursor-pointer">
        <p>ELECTRONICS</p>
        <p>CLOTHES</p>
        <p>ACCESSORIES</p>
        <p>LAPTOPS</p>
        <p>MOBILES</p>
        <p>SPORTS</p>
        <p>BEAUTY</p>
      </div>
      <hr className="border-neutral-700" />
      <div className="w-full flex justify-center py-4 text-xs">
        <p className="flex gap-2 items-center">
          Designed by{" "}
          <img src="/images/sign.png" className="w-[5rem] invert" alt="sign" />{" "}
          @ 2024
        </p>
      </div>
    </div>
  );
};
export default Footer;
