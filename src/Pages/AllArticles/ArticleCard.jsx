import axios from "axios";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ArticleCard = ({ article, refetch }) => {
  const {
    _id,
    title,
    author,
    image,
    authorEmail,
    authorPhoto,
    publishedDate,
    status,
    publisher,
  } = article;

  const handleMakeApproved = () => {
    Swal.fire({
      title: "Want to approve this article?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.patch(`http://localhost:5000/articles/${_id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            toast.success("Article Approved");
          }
        });
      }
    });
  };
  return (
    <div>
      <div className="card card-compact bg-blue-200 shadow-xl">
        <figure>
          <img className="w-full h-[300px]" src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="text-xl font-semibold h-[60px]">{title}</h2>
          <div className="flex items-center gap-20">
            <div className="flex items-center gap-4">
              <img className="rounded-full w-12" src={authorPhoto} alt="" />
              <div>
                <p className="text-lg font-medium">{author}</p>
                <p>{authorEmail}</p>
              </div>
            </div>
            <p className="text-lg">{publishedDate}</p>
          </div>
          <div className="mt-4 text-lg">
            <p>
              <span className="font-bold">Publisher : </span>
              {publisher}
            </p>
            <p>
              <span className="font-bold">Status : </span>
              {status}
            </p>
          </div>
          <div className="flex justify-center gap-2 mt-3">
            {status !== "Approved" ? (
              <button
                onClick={handleMakeApproved}
                className="btn bg-green-400 hover:bg-green-500 border-none">
                Approve
              </button>
            ) : (
              <></>
            )}
            {status !== "Approved" ? (
              <button className="btn bg-fuchsia-400 hover:bg-fuchsia-500 border-none">
                Decline
              </button>
            ) : (
              <></>
            )}
            <button className="btn bg-red-400 hover:bg-red-500 border-none">
              Delete
            </button>
            <button className="btn bg-gradient-to-r from-cyan-500 to-blue-500 border-none">
              Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ArticleCard.propTypes = {
  article: PropTypes.object,
  refetch: PropTypes.func,
};

export default ArticleCard;
