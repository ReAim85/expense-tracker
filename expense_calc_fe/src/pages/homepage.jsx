import { useCookie } from "../assets/context";
export const Home = () => {
  const { user } = useCookie();
  return <div>Hi {user}</div>;
};
