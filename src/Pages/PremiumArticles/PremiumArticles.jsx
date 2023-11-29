import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
import useArticles from "../../hooks/useArticles";
import PremiumArticleCard from "./PremiumArticleCard";

const PremiumArticles = () => {
  const { articles } = useArticles();
  const premiumArticles = articles.filter((article) => article.isPremium);
  return (
    <div>
      <SectionTitle heading="Premium Articles"></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {premiumArticles &&
          premiumArticles.map((article) => (
            <PremiumArticleCard
              key={article._id}
              article={article}></PremiumArticleCard>
          ))}
      </div>
    </div>
  );
};

export default PremiumArticles;
