import { createContext, useContext, useEffect } from "react";
import { atom, useAtom } from "jotai";
import axios from "axios";
import { BE_URL } from "../config.js";

const CookieContext = createContext();

export const useCookie = () => useContext(CookieContext);
const CookieAtom = atom("");
const loggedInAtom = atom(false);
const loading = atom(true);

export const CookieProvider = ({ children }) => {
  const [user, setUser] = useAtom(CookieAtom);
  const [isLoggedIn, setIsLoggedIn] = useAtom(loggedInAtom);
  const [authloading, setAuthLoading] = useAtom(loading);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BE_URL}/api/auth/me`, {
          withCredentials: true,
        });
        setUser(res.data.userInfo.name);
      } catch (err) {
        console.log(err);
      } finally {
        setAuthLoading(false);
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
    <CookieContext.Provider value={{ user, setUser, isLoggedIn, authloading }}>
      {children}
    </CookieContext.Provider>
  );
};
