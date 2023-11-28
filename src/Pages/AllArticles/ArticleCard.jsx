import PropTypes from "prop-types";

const ArticleCard = ({ article }) => {
  const {
    title,
    author,
    image,
    authorEmail,
    authorPhoto,
    publishedDate,
    status,
    publisher,
  } = article;
  return (
    <div>
      <div className="card card-compact bg-base-100 shadow-xl">
        <figure>
          <img className="w-full h-[300px]" src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="text-xl font-semibold h-[60px]">{title}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

ArticleCard.propTypes = {
  article: PropTypes.object,
};

export default ArticleCard;
