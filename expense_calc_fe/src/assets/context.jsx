import { createContext, useContext, useEffect } from "react";
import { atom, useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BE_URL } from "../config.js";

const CookieContext = createContext();

export const useCookie = () => useContext(CookieContext);
const CookieAtom = atom(null);

export const CookieProvider = ({ children }) => {
  const [user, setUser] = useAtom(CookieAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BE_URL}/api/auth/me`, {
          withCredentials: true,
        });
        setUser(res.data.userInfo.name);
        console.log("context res.data is this", res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <CookieContext.Provider value={{ user, setUser }}>
      {children}
    </CookieContext.Provider>
  );
};
