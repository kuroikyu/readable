import { Route, Routes } from "react-router";
import { Provider } from "react-redux";

import { store } from "./store";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/home";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
