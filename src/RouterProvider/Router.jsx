import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import MyProfile from "../Pages/MyProfile/MyProfile";
import AddArticle from "../Pages/AddArticle/AddArticle";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AllArticles from "../Pages/AllArticles/AllArticles";
import AddPublisher from "../Pages/Dashboard/AddPublisher/AddPublisher";
import AllArticlesHome from "../Pages/AllArticlesHome/AllArticlesHome";
import Details from "../Pages/Details/Details";
import Subscription from "../Pages/Subscription/Subscription";
import Payment from "../Pages/Payment/Payment";
import PremiumArticles from "../Pages/PremiumArticles/PremiumArticles";
import MyArticles from "../Pages/MyArticles/MyArticles";
import UpdateArticle from "../Pages/UpdateArticle/UpdateArticle";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "myProfile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "addArticle",
        element: (
          <PrivateRoute>
            <AddArticle></AddArticle>,
          </PrivateRoute>
        ),
      },
      {
        path: "allArticles",
        element: <AllArticlesHome></AllArticlesHome>,
      },
      {
        path: "details/:id",
        element: (
          <PrivateRoute>
            <Details></Details>,
          </PrivateRoute>
        ),
      },
      {
        path: "subscription",
        element: (
          <PrivateRoute>
            <Subscription></Subscription>
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "premiumArticles",
        element: (
          <PrivateRoute>
            <PremiumArticles></PremiumArticles>,
          </PrivateRoute>
        ),
      },
      {
        path: "myArticles",
        element: (
          <PrivateRoute>
            <MyArticles></MyArticles>
          </PrivateRoute>
        ),
      },
      {
        path: "updateArticle/:id",
        element: (
          <PrivateRoute>
            <UpdateArticle></UpdateArticle>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "allArticles",
        element: (
          <AdminRoute>
            <AllArticles></AllArticles>
          </AdminRoute>
        ),
      },
      {
        path: "addPublisher",
        element: (
          <AdminRoute>
            <AddPublisher></AddPublisher>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default Router;
