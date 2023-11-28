import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
import useArticles from "../../hooks/useArticles";
import ArticleCard from "./ArticleCard";

const AllArticles = () => {
  const { articles } = useArticles();
  return (
    <div>
      <SectionTitle heading="All Articles"></SectionTitle>
      {articles &&
        articles.map((article) => (
          <ArticleCard key={article._id} article={article}></ArticleCard>
        ))}
    </div>
  );
};

export default AllArticles;
