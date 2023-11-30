import Banner from "../../components/Banner/Banner";
import Publishers from "../../components/Publishers/Publishers";
import useArticles from "../../hooks/useArticles";
import Count from "./Count";
import Location from "./Location";
import Plans from "./Plans";

const Home = () => {
  const { isLoading } = useArticles();
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <Banner></Banner>
      <Publishers></Publishers>
      <Count></Count>
      <Plans></Plans>
      <Location></Location>
    </div>
  );
};

export default Home;
