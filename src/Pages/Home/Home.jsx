import Banner from "../../components/Banner/Banner";
import Publishers from "../../components/Publishers/Publishers";
import useArticles from "../../hooks/useArticles";

const Home = () => {
  const { isLoading } = useArticles();
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <Banner></Banner>
      <Publishers></Publishers>
    </div>
  );
};

export default Home;
