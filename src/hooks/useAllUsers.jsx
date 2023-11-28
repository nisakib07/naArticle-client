import { useQuery } from "@tanstack/react-query";

const useAllUsers = () => {
  const {
    data: publishers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("http://localhost:5000/publishers").then((res) => res.json()),
  });

  return { publishers, refetch, isLoading };
};

export default useAllUsers;
