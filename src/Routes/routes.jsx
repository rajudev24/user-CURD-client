import { createBrowserRouter } from "react-router-dom";
import Register from "../Pages/Register";
import SignIn from "../components/UI/SignIn";
import Users from "../Pages/Users";
import NotFound from "../Pages/NotFound";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
