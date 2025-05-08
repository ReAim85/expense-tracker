import { useCookie } from "../assets/context";
import { Navbar } from "../component/navbar.jsx";
import { HiOutlineUserCircle } from "react-icons/hi2";
export const Home = () => {
  const { user } = useCookie();
  return (
    <div className="">
      <div className="flex">
        <div>
          <Navbar user={user} />
        </div>
        <div className="w-screen flex flex-1 bg-white ml-5 rounded-4xl p-6 mt-5 mr-5 mb-5 ">
          <div className="ml-auto flex">
            <div className="font-medium pt-2.5">Hi {user}</div>
            <HiOutlineUserCircle className="text-5xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
