import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-screen-xl mx-auto">
        <Outlet></Outlet>
      </div>

      <ToastContainer></ToastContainer>
    </div>
  );
};

export default MainLayout;
