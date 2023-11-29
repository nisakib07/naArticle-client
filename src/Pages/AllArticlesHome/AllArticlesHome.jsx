import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
import useArticles from "../../hooks/useArticles";
import AllArticlesHomeCard from "./AllArticlesHomeCard";

const AllArticlesHome = () => {
  const { articles } = useArticles();
  const approvedArticles = articles.filter(
    (article) => article.status === "Approved"
  );
  return (
    <div>
      <SectionTitle heading="All Articles"></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-5">
        {approvedArticles &&
          approvedArticles.map((article) => (
            <AllArticlesHomeCard
              key={article._id}
              article={article}></AllArticlesHomeCard>
          ))}
      </div>
    </div>
  );
};

export default AllArticlesHome;
