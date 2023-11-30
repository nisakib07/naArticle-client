import { useQuery } from "@tanstack/react-query";

const useAllUsers = () => {
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("http://localhost:5000/users", { credentials: "include" }).then(
        (res) => res.json()
      ),
  });

  return { users, refetch, isLoading };
};

export default useAllUsers;
