import PropTypes from "prop-types";

const PlanCard = ({ plan }) => {
  const { name, duration, price, features, image } = plan;
  return (
    <div>
      <div className="card bg-base-100 shadow-xl relative">
        <figure>
          <img className="h-[400px]" src={image} alt="Shoes" />
        </figure>
        <p className="absolute bg-fuchsia-500 py-2 px-3 rounded-xl top-2 right-2">
          {duration}
        </p>
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="font-medium">Price : ${price}</p>
          </div>{" "}
          <h3 className="text-lg font-medium mt-4">Features:</h3>
          <ul>
            {features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

PlanCard.propTypes = {
  plan: PropTypes.object,
};

export default PlanCard;
