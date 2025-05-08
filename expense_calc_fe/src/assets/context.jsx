import { createContext, useContext, useEffect } from "react";
import { atom, useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BE_URL } from "../config.js";

const CookieContext = createContext();

export const useCookie = () => useContext(CookieContext);
const CookieAtom = atom("Vishal Jha");
const loggedInAtom = atom(false);

export const CookieProvider = ({ children }) => {
  const [user, setUser] = useAtom(CookieAtom);
  const [isLoggedIn, setIsLoggedIn] = useAtom(loggedInAtom);

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
      setIsLoggedIn(true);
    }
  }, [user]);

  return (
    <CookieContext.Provider value={{ user, setUser, isLoggedIn }}>
      {children}
    </CookieContext.Provider>
  );
};
