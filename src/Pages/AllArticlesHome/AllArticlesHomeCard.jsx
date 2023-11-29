import PropTypes from "prop-types";
import { FaArrowRight } from "react-icons/fa";

const AllArticlesHomeCard = ({ article }) => {
  const { title, image, publisher, details, isPremium } = article;

  return (
    <div>
      <div className="card card-compact bg-base-100 shadow-xl">
        <figure>
          <img className="w-full h-[300px]" src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="text-xl font-semibold h-[60px]">{title}</h2>
          <p className="text-lg">
            <span className="font-bold">Publisher : </span>
            {publisher}
          </p>
          <p className="text-lg">{details.slice(0, 200)}...</p>
          <div className="card-actions justify-end">
            {isPremium ? (
              <button className="btn btn-disabled mt-3">
                See Details <FaArrowRight />
              </button>
            ) : (
              <button className="btn bg-indigo-300 hover:bg-indigo-400 mt-3">
                See Details <FaArrowRight />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

AllArticlesHomeCard.propTypes = {
  article: PropTypes.object,
};

export default AllArticlesHomeCard;
