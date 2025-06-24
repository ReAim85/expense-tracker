import { useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { CiWallet } from "react-icons/ci";
import { HiOutlineCurrencyRupee, HiOutlineUserCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="md:hidden fixed top-4 right-5 pt-5 z-50">
        <button
          onClick={() => setOpen(true)}
          className="text-gray-700 text-3xl"
        >
          ☰
        </button>
      </div>
      <div
        className={`fixed top-0 left-0 z-40 h-full bg-sky-200 h-screen pl-10 pr-3 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block`}
      >
        <div className="h-full grid grid-rows-10 pr-5">
          <div className="row-span-1 font-bold text-white row-start-2 flex justify-center">
            <HiOutlineUserCircle className="text-5xl text-gray-700" />
          </div>
          <div className="row-start-5 row-span-1 text-5xl flex justify-center">
            <AiOutlineProduct
              className="text-gray-700 cursor-pointer"
              onClick={() =>
                window.open(
                  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                  "_blank"
                )
              }
            />
          </div>
          <div className="row-start-6 row-span-1 text-5xl flex justify-center">
            <HiOutlineCurrencyRupee
              className="text-gray-700 cursor-pointer"
              onClick={() => navigate("/addExpense")}
            />
          </div>
          <div className="row-start-7 row-span-1 text-5xl flex justify-center">
            <CiWallet
              className="text-gray-700 cursor-pointer"
              onClick={() => navigate("/history")}
            />
          </div>
        </div>
      </div>
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};
