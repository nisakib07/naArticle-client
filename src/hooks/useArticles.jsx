import { useQuery } from "@tanstack/react-query";

const useArticles = () => {
  const {
    data: articles = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: () =>
      fetch("https://assignmentb8-12-server.vercel.app/articles").then((res) =>
        res.json()
      ),
  });

  return { articles, refetch, isLoading };
};

export default useArticles;
