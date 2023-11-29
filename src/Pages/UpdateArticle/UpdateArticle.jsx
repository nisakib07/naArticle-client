import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const UpdateArticle = () => {
  const { id } = useParams();
  const { data: singleArticle, isLoading } = useQuery({
    queryKey: ["singleArticle"],
    queryFn: () =>
      fetch(`http://localhost:5000/articles/${id}`).then((res) => res.json()),
  });
  return <div></div>;
};

export default UpdateArticle;
