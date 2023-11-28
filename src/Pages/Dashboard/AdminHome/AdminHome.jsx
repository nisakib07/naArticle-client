import { Blocks } from "react-loader-spinner";
import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";
import useArticles from "../../../hooks/useArticles";
import usePublishers from "../../../hooks/usePublishers"; // Import the new hook
import { Chart } from "react-google-charts";

const AdminHome = () => {
  const { articles } = useArticles();
  const { publishers, isLoading } = usePublishers();

  const publisherData = publishers.map((publisher) => ({
    name: publisher.name,
    count: articles.filter((article) => article.publisher === publisher.name)
      .length,
  }));

  const chartData = [
    ["Publisher", "Number of Articles"],
    ...publisherData.map((data) => [data.name, data.count]),
  ];

  const options = {
    title: "Article Percentage of different publishers",
  };

  return (
    <div>
      <SectionTitle heading="Admin Home" subHeading="Let's have the stats" />

      {isLoading ? (
        <Blocks
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      ) : (
        <Chart
          chartType="PieChart"
          data={chartData}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      )}
    </div>
  );
};

export default AdminHome;
