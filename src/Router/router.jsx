import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layout/Mainlayout";
import Home from "../Pages/Home/Home/Home";
import SignUp from "../Pages/UserAuthentication/Singnup/Signup";
import Login from "../Pages/UserAuthentication/Login/Login";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import SidebarDeshboad from "../Pages/Dashboad/Dashboad/SidebarDahboad.jsx/SidebarDeshboad";
import PrivateRoute from "./PrivateRouter";
import DnsManage from "../Pages/Dashboad/Dashboad/AdminIteams/DnsManage/DnsManage";
import UpdateItem from "../Pages/Dashboad/Dashboad/AdminIteams/UpdateIteam/Updateiteam";
import AddItems from "../Pages/Dashboad/Dashboad/AdminIteams/AddIteams/Additeam";
import Products from "../Pages/Dashboad/Allproduct/Product/Product";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <SidebarDeshboad></SidebarDeshboad>
      </PrivateRoute>
    ),
    children: [
      {
        path: "dashboard/manageitem",
        element: <DnsManage></DnsManage>,
      },
      {
        path: "product",
        element: <Products></Products>,
      },
      {
        path: "dashboard/addItems",
        element: <AddItems></AddItems>,
      },

      {
        path: "updateItem/:id",
        element: <UpdateItem></UpdateItem>,
        loader: ({ params }) =>
          fetch(`https://dns-sever.vercel.app/product/${params.id}`),
      },
    ],
  },
]);
