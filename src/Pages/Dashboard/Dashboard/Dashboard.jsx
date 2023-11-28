import { NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="flex max-w-screen-xl mx-auto">
      <div className="w-60 bg-blue-300 min-h-screen flex flex-col px-5 pt-16">
        <ul className="menu nav text-lg space-y-2" id="nav">
          <NavLink to="/dashboard/adminHome">Admin Home</NavLink>
          <NavLink to="/dashboard/allUsers">All Users</NavLink>
          <NavLink to="/dashboard/allArticles">All Articles</NavLink>
          <NavLink to="/dashboard/addPublisher">Add Publisher</NavLink>
          <div className="divider"></div>
          <NavLink to="/">Home</NavLink>
        </ul>
      </div>
      <div className="flex-grow">
        <Outlet></Outlet>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Dashboard;
