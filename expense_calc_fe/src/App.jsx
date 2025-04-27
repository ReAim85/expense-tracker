import { Provider } from "jotai";
import { Login } from "./pages/loginpage.jsx";
import { useCookie, CookieProvider } from "./assets/context.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home } from "./pages/homepage.jsx";
import ProtectedRoute from "./assets/protectedRoute.jsx";

const AuthRoute = ({ children }) => {
  const { user } = useCookie();
  console.log("app.jsx user is ", user);
  return user ? <Navigate to="/" /> : children;
};

const App = () => {
  return (
    <Router>
      <CookieProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </CookieProvider>
    </Router>
  );
};

export default App;
