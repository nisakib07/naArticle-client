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

  const pieChartData = [
    ["Publisher", "Number of Articles"],
    ...publisherData.map((data) => [data.name, data.count]),
  ];

  const articleStatusData = [
    ["Status", "Number of Articles"],
    [
      "Pending",
      articles.filter((article) => article.status === "Pending").length,
    ],
    [
      "Approved",
      articles.filter((article) => article.status === "Approved").length,
    ],
    [
      "Declined",
      articles.filter((article) => article.status === "Declined").length,
    ],
  ];

  const premiumData = [
    ["Status", "Number of Articles"],
    ["Premium", articles.filter((article) => article.isPremium).length],
    ["Non-Premium", articles.filter((article) => !article.isPremium).length],
  ];

  const optionsPie = {
    title: "Article Percentage of different publishers",
  };

  const options = {
    title: "Article Status Statistics",
    bars: "vertical",
    legend: { position: "none" },
  };

  const optionsLine = {
    title: "Premium vs Non-Premium Articles",
    curveType: "function",
    legend: { position: "none" },
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
        <>
          <Chart
            chartType="PieChart"
            data={pieChartData}
            options={optionsPie}
            width={"100%"}
            height={"400px"}
          />

          <Chart
            chartType="BarChart"
            data={articleStatusData}
            options={options}
            width={"100%"}
            height={"400px"}
          />
          <Chart
            chartType="LineChart"
            data={premiumData}
            options={optionsLine}
            width={"100%"}
            height={"400px"}
          />
        </>
      )}
    </div>
  );
};

export default AdminHome;
