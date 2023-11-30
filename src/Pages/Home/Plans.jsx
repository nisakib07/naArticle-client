import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
import { Blocks } from "react-loader-spinner";
import PlanCard from "./PlanCard";

const Plans = () => {
  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: () =>
      fetch("http://localhost:5000/plans").then((res) => res.json()),
  });

  if (isLoading) {
    return (
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    );
  }

  return (
    <div>
      <SectionTitle heading="Plans"></SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {plans &&
          plans.map((plan) => <PlanCard key={plan._id} plan={plan}></PlanCard>)}
      </div>
    </div>
  );
};

export default Plans;
