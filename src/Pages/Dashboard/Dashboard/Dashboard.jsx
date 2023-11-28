import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex max-w-screen-xl mx-auto">
      <div className="w-60 bg-blue-300 min-h-screen flex flex-col pl-10 pt-16">
        <NavLink to="/dashboard/adminHome">Admin Home</NavLink>
        <NavLink to="/dashboard/allUsers">All Users</NavLink>
        <NavLink to="/dashboard/allArticles">All Articles</NavLink>
        <NavLink to="/dashboard/addPublisher">Add Publisher</NavLink>
      </div>
      <div className="flex-grow">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
