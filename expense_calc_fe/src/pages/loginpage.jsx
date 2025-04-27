import axios from "axios";
import { atom, useAtom } from "jotai";
import { BE_URL } from "../config";
import { useCookie } from "../assets/context";

const loginDataFormat = atom({
  email: "",
  password: "",
});

export const Login = () => {
  const [loginData, setLoginData] = useAtom(loginDataFormat);
  const { setUser, user } = useCookie();

  const onClickHandler = async () => {
    try {
      const res = await axios.post(`${BE_URL}/api/auth/login`, loginData, {
        withCredentials: true,
      });
      if (res.status === 200 && res.data) {
        setUser(res.data.userInfo.name);
        console.log("login user is", user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <input
        type="text"
        name="email"
        placeholder="email"
        value={loginData.email.toLowerCase()}
        onChange={(e) =>
          setLoginData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
      />
      <br />
      <input
        type="type"
        name="password"
        placeholder="Password"
        value={loginData.password}
        onChange={(e) =>
          setLoginData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
      />
      <br />
      <button onClick={onClickHandler}>Login</button>
    </div>
  );
};
