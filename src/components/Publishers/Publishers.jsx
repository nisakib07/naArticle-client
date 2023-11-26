import usePublishers from "../../hooks/usePublishers";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";

const Publishers = () => {
  const { publishers } = usePublishers();
  return (
    <div>
      <SectionTitle
        heading="Publishers"
        subHeading="They make the world look smaller"></SectionTitle>
      <div className="flex flex-wrap gap-6 items-center justify-center">
        {publishers &&
          publishers.map((publisher) => (
            <div key={publisher._id}>
              <img className="w-32 h-24" src={publisher.logo} alt="" />
              <p className="text-center mt-6 text-xl">{publisher.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Publishers;
