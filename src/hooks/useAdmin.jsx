import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const {
    data: isAdmin,
    refetch,
    isLoading: isAdminLoading,
  } = useQuery({
    queryKey: ["isAdmin"],
    enabled: !!user?.email,
    queryFn: () =>
      fetch(`http://localhost:5000/users/admin/${user?.email}`).then((res) =>
        res.json()
      ),
  });

  return { isAdmin, refetch, isAdminLoading };
};

export default useAdmin;
