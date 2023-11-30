import { useQuery } from "@tanstack/react-query";

const usePublishers = () => {
  const {
    data: publishers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["publishers"],
    queryFn: () =>
      fetch("https://assignmentb8-12-server.vercel.app/publishers").then(
        (res) => res.json()
      ),
  });

  return { publishers, refetch, isLoading };
};

export default usePublishers;
