import { AiOutlineProduct } from "react-icons/ai";
import { CiWallet } from "react-icons/ci";
import { HiOutlineCurrencyRupee, HiOutlineUserCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen grid grid-rows-10 mx-6">
      <div className="row-span-1 text-xl font-bold text-white row-start-2">
        <HiOutlineUserCircle className="text-5xl text-shadow-lg" />
      </div>
      <div className="text-white row-start-5 row-span-1 text-5xl flex justify-center ">
        <AiOutlineProduct />
      </div>
      <div className="text-white row-start-6 row-span-1 text-5xl flex justify-center cursor-pointer">
        <HiOutlineCurrencyRupee onClick={() => navigate("/addExpense")} />
      </div>
      <div className="text-white row-start-7 row-span-1 text-5xl flex justify-center">
        <CiWallet />
      </div>
    </div>
  );
};
