import axios from "axios";
import { atom, useAtom } from "jotai";
import { API_BASE_URL } from "../config";

const loginDataFormat = atom({
  email: "",
  password: "",
});

export const Login = () => {
  const [loginData, setLoginData] = useAtom(loginDataFormat);

  const onClickHandler = async () => {
    console.log(API_BASE_URL);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        loginData,
        {
          withCredentials: true,
        }
      );
      console.log(res);
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
