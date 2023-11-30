import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useSubscribed = () => {
  const { user } = useContext(AuthContext);
  const {
    data: currentUser = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["singleUser"],
    enabled: !!user?.email,
    queryFn: () =>
      fetch(`http://localhost:5000/users/${user?.email}`).then((res) =>
        res.json()
      ),
  });

  return { currentUser, refetch, isLoading };
};

export default useSubscribed;
