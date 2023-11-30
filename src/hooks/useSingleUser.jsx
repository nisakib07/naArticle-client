import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useSingleUser = () => {
  const { user } = useContext(AuthContext);
  const {
    data: currentUser = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["singleUser"],
    enabled: !!user?.email,
    queryFn: () =>
      fetch(
        `https://assignmentb8-12-server.vercel.app/users/${user?.email}`
      ).then((res) => res.json()),
  });

  return { currentUser, refetch, isLoading };
};

export default useSingleUser;
