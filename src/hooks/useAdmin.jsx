import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useAdmin = () => {
  const { user } = useContext(AuthContext);

  const {
    data: isAdmin,
    refetch,
    isLoading: isAdminLoading,
  } = useQuery({
    queryKey: ["isAdmin"],
    enabled: !!user?.email,
    queryFn: () =>
      fetch(
        `https://assignmentb8-12-server.vercel.app/users/admin/${user?.email}`,
        {
          credentials: "include",
        }
      ).then((res) => res.json()),
  });

  return { isAdmin, refetch, isAdminLoading };
};

export default useAdmin;
