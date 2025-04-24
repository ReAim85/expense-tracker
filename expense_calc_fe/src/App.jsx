import { Provider } from "jotai";
import { Login } from "./pages/login.jsx";
const App = () => {
  return (
    <div>
      <Provider>
        <Login />
      </Provider>
    </div>
  );
};

export default App;
