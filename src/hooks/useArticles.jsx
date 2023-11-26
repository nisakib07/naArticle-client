import { useQuery } from "@tanstack/react-query";

const useArticles = () => {
  const {
    data: articles = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["data"],
    queryFn: () =>
      fetch("http://localhost:5000/articles").then((res) => res.json()),
  });

  return { articles, refetch, isLoading };
};

export default useArticles;
