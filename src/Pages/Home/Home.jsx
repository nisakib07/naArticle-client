import Banner from "../../components/Banner/Banner";
import Publishers from "../../components/Publishers/Publishers";
import useArticles from "../../hooks/useArticles";
import Count from "./Count";

const Home = () => {
  const { isLoading } = useArticles();
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <Banner></Banner>
      <Publishers></Publishers>
      <Count></Count>
    </div>
  );
};

export default Home;
