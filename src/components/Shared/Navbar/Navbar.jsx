import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";

const Navbar = () => {
  const { user, userLogout } = useContext(AuthContext);
  const { isAdmin } = useAdmin();
  let subscriptionTaken = true;
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/addArticle">Add Article</NavLink>
        </li>
      )}
      <li>
        <NavLink to="/allArticles">All Articles</NavLink>
      </li>

      {user && (
        <li>
          <NavLink to="/subscription">Subscription</NavLink>
        </li>
      )}

      {user && isAdmin?.isAdmin && (
        <li>
          <NavLink to="/dashboard/adminHome">Dashboard</NavLink>
        </li>
      )}
      {user && subscriptionTaken && (
        <li>
          <NavLink to="/premiumArticles">Premium Articles</NavLink>
        </li>
      )}
      {user && (
        <li>
          <NavLink to="/myArticles">My Articles</NavLink>
        </li>
      )}
    </>
  );

  const handleLogOut = () => {
    userLogout();
  };

  return (
    <div className="bg-blue-200 shadow-xl">
      <div className="navbar max-w-screen-xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navLinks}
            </ul>
          </div>
          <div className="flex items-center gap-3">
            <img
              className="w-[40px]"
              src="https://i.ibb.co/CwB4F4d/logo.png"
              alt=""
            />
            <h1 className="text-4xl font-bold">NaArticle</h1>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex-none">
              {user ? (
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={
                          user?.photoURL
                            ? user.photoURL
                            : "https://i.ibb.co/DCghjvD/profile.jpg"
                        }
                      />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                      <Link to="/myProfile">My Profile</Link>
                    </li>

                    <li>
                      <a onClick={handleLogOut}>Logout</a>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/login">
                  <button className="btn bg-cyan-500 hover:bg-cyan-400 border-none">
                    Login
                  </button>
                </Link>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="btn mr-3">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn">Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
