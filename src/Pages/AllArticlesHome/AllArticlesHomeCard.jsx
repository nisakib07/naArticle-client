import axios from "axios";
import PropTypes from "prop-types";
import { FaArrowRight, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import useSingleUser from "../../hooks/useSingleUser";

const AllArticlesHomeCard = ({ article, refetch }) => {
  const { title, image, publisher, details, isPremium, _id, views } = article;
  const { currentUser } = useSingleUser();
  const isSubscribed = currentUser.isSubscribed;

  const handleView = async () => {
    await axios
      .patch(`http://localhost:5000/articles/increase-view/${_id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
        }
      });
  };

  return (
    <div>
      <div className="card card-compact bg-base-100 shadow-xl relative">
        <figure>
          <img className="w-full h-[300px]" src={image} alt="Shoes" />
        </figure>
        {isPremium && (
          <div className="bg-fuchsia-600 rounded-xl px-2 text-white py-2 absolute top-2 right-2">
            Premium
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center justify-between h-[60px]">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="flex items-center gap-2">
              <FaEye></FaEye> {views}
            </p>
          </div>
          <p className="text-lg">
            <span className="font-bold">Publisher : </span>
            {publisher}
          </p>
          <p className="text-lg h-[100px]">{details.slice(0, 200)}...</p>
          <div className="card-actions justify-end">
            {isPremium && !isSubscribed ? (
              <button className="btn btn-disabled mt-3">
                See Details <FaArrowRight />
              </button>
            ) : (
              <Link to={`/details/${_id}`}>
                <button
                  onClick={handleView}
                  className="btn bg-indigo-300 hover:bg-indigo-400 mt-3">
                  See Details <FaArrowRight />
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

AllArticlesHomeCard.propTypes = {
  article: PropTypes.object,
  refetch: PropTypes.func,
};

export default AllArticlesHomeCard;
