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
import { Expense } from "./pages/expensepage.jsx";

const AuthRoute = ({ children }) => {
  const { user, isLoggedIn } = useCookie();
  console.log("app.jsx user is ", user);
  return isLoggedIn ? <Navigate to="/" /> : children;
};

const App = () => {
  return (
    <div className="bg-gradient-to-b from-blue-700 to-sky-200 h-screen">
      <Provider>
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
              <Route
                path="/addExpense"
                element={
                  <ProtectedRoute>
                    <Expense />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </CookieProvider>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
