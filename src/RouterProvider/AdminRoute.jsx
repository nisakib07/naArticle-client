import { useContext } from "react";
import useAdmin from "../hooks/useAdmin";
import { AuthContext } from "../Provider/AuthProvider";
import { Blocks } from "react-loader-spinner";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const AdminRoute = ({ children }) => {
  const { isAdmin, isAdminLoading } = useAdmin();
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading || isAdminLoading) {
    return (
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    );
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }}></Navigate>;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
