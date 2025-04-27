import { useCookie } from "./context";
import { Navigate, useActionData } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useCookie();
  console.log("protectd user is ", user);

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default ProtectedRoute;
