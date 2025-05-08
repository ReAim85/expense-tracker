import axios from "axios";
import { atom, useAtom } from "jotai";
import { BE_URL } from "../config";
import loginImg from "../assets/images/response.png";
import { useCookie } from "../assets/context";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const loginDataFormat = atom({
  email: "",
  password: "",
});

const password = atom(false);

export const Login = () => {
  const [loginData, setLoginData] = useAtom(loginDataFormat);
  const [showPassword, setShowPassword] = useAtom(password);
  const { setUser, user } = useCookie();

  const onClickHandler = async () => {
    try {
      const res = await axios.post(`${BE_URL}/api/auth/login`, loginData, {
        withCredentials: true,
      });
      if (res.status === 200 && res.data) {
        setUser(res.data.name);
        console.log("login user is", user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-b from-blue-700 to-sky-200 h-screen">
      <div className="grid grid-cols-2 bg-white h-150 w-270 rounded-3xl">
        <div className="m-auto">
          <h1 className="text-center text-4xl mb-16 font-bold">Login</h1>
          <p className="text-gray-500 text-sm">Email</p>
          <input
            type="text"
            name="email"
            value={loginData.email.toLowerCase()}
            onChange={(e) =>
              setLoginData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            className="bg-gray-200 rounded-lg py-2 w-76 pr-2 pl-3 outline-none"
          />
          <br />
          <label className="text-gray-500 text-sm">Password</label>
          <br />
          <div className="flex">
            <input
              type={!showPassword ? "password" : "text"}
              name="password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              className="bg-gray-200 rounded-s-lg py-2 w-70 pr-2 pl-3 outline-none"
            />
            <div
              className="cursor-pointer w-6 pt-3 pl-1 bg-gray-200 rounded-e-lg"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <br />
          <button
            onClick={onClickHandler}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-1"
          >
            Login
          </button>
        </div>
        <div className="bg-gray-200 flex justify-center rounded-r-3xl">
          <div className="m-auto">
            <img className="w-150 m-auto" src={loginImg} alt="loginImage" />
            <>
              <p className="text-center font-bold text-2xl">Lorem ipsum</p>
              <br />
              <p className="text-center text-sm px-10">
                dolor sit amet consectetur, adipisicing elit. Laboriosam soluta
                consectetur reiciendis molestiae illum, facilis accusamus quas.
              </p>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};
