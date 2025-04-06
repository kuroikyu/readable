import { Route, Routes } from "react-router";
import { Provider } from "react-redux";

import { store } from "./store";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/home";
import MainLayout from "./layouts/MainLayout";
import ReaderLayout from "./layouts/ReaderLayout";
import Reader from "./pages/reader";
import ReaderStats from "./pages/readerStats";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  return (
    <Provider store={store}>
      <TooltipProvider>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="/read" element={<ReaderLayout />}>
            <Route index element={<Reader />} />
            <Route path="stats" element={<ReaderStats />} />
          </Route>
        </Routes>
      </TooltipProvider>
    </Provider>
  );
}

export default App;
