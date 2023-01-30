import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import AuthRoute from "../components/AuthRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={
          <AuthRoute>
            <Home />
          </AuthRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;