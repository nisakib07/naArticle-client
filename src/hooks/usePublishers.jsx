import { useQuery } from "@tanstack/react-query";

const usePublishers = () => {
  const {
    data: publishers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["publishers"],
    queryFn: () =>
      fetch("http://localhost:5000/publishers", {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return { publishers, refetch, isLoading };
};

export default usePublishers;
