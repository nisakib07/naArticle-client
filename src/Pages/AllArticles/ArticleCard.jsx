import axios from "axios";

import PropTypes from "prop-types";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ArticleCard = ({ article, refetch }) => {
  const {
    _id,
    title,
    tags,
    views,
    author,
    image,
    isPremium,
    details,
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
        axios
          .patch(`https://assignmentb8-12-server.vercel.app/articles/${_id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              toast.success("Article Approved");
            }
          });
      }
    });
  };

  const handleDecline = (e) => {
    e.preventDefault();
    const declineReason = e.target.declineReason.value;
    const updatedArticle = {
      title: title,
      tags: tags,
      views: views,
      publisher: publisher,
      image: image,
      isPremium: isPremium,
      author: author,
      authorEmail: authorEmail,
      authorPhoto: authorPhoto,
      publishedDate: publishedDate,
      details: details,
      status: "Declined",
      declineReason: declineReason,
    };

    axios
      .put(
        `https://assignmentb8-12-server.vercel.app/articles/${_id}`,
        updatedArticle,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Article Declined with reason");
        } else {
          toast.warn("Already Declined");
        }
        e.target.reset();
        refetch();
      });
  };

  const handleDeleteArticle = () => {
    Swal.fire({
      title: "Want to delete this article?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://assignmentb8-12-server.vercel.app/articles/${_id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              toast.success("Article Deleted");
            }
          });
      }
    });
  };

  const handleMakePremium = () => {
    Swal.fire({
      title: "Make this article Premium?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `https://assignmentb8-12-server.vercel.app/articles/premium/${_id}`
          )
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              toast.success("Article has been made premium");
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
          <div className="flex items-center gap-20 h-[80px]">
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
              <button
                onClick={() =>
                  document.getElementById(`my_modal_${_id}`).showModal()
                }
                className="btn bg-fuchsia-400 hover:bg-fuchsia-500 border-none">
                Decline
              </button>
            ) : (
              <></>
            )}
            <button
              onClick={handleDeleteArticle}
              className="btn bg-red-400 hover:bg-red-500 border-none">
              Delete
            </button>
            <button
              onClick={handleMakePremium}
              className="btn bg-gradient-to-r from-cyan-500 to-blue-500 border-none">
              Premium
            </button>
          </div>
          <dialog
            id={`my_modal_${_id}`}
            className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-center mb-4">
                Reason of declining
              </h3>
              <form onSubmit={handleDecline}>
                <textarea
                  required
                  className="textarea textarea-bordered h-24 w-full"
                  name="declineReason"
                  placeholder="Type here..."></textarea>
                <br />
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="btn mt-4 bg-green-400 hover:bg-green-500">
                    Submit
                  </button>
                </div>
              </form>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
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
