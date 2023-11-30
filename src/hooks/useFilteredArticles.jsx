// useFilteredArticles.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFilteredArticles = ({ status, search, tags, publisher }) => {
  const fetchFilteredArticles = async () => {
    const response = await axios.get(
      "https://assignmentb8-12-server.vercel.app/articles",
      {
        params: {
          status,
          search,
          tags: tags.join(","),
          publisher,
        },
      }
    );

    return response.data;
  };

  return useQuery(
    ["filteredArticles", status, search, tags, publisher],
    fetchFilteredArticles
  );
};

export default useFilteredArticles;
