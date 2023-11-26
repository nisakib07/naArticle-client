import Banner from "../../components/Banner/Banner";
import useArticles from "../../hooks/useArticles";

const Home = () => {
  const { isLoading } = useArticles();
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <Banner></Banner>
    </div>
  );
};

export default Home;
