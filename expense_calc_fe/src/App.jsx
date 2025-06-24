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
import { History } from "./pages/history.jsx";

const AuthRoute = ({ children }) => {
  const { user, isLoggedIn } = useCookie();
  console.log("app.jsx user is ", user);
  return isLoggedIn ? <Navigate to="/" /> : children;
};

const App = () => {
  return (
    <div className="bg-sky-200 mh-screen">
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
              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <History />
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
