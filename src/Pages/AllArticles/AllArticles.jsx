import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
import useArticles from "../../hooks/useArticles";
import ArticleCard from "./ArticleCard";

const AllArticles = () => {
  const { articles } = useArticles();
  return (
    <div>
      <SectionTitle heading="All Articles"></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-5">
        {articles &&
          articles.map((article) => (
            <ArticleCard key={article._id} article={article}></ArticleCard>
          ))}
      </div>
    </div>
  );
};

export default AllArticles;
