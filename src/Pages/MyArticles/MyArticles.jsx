import { useContext } from "react";
import useArticles from "../../hooks/useArticles";
import { AuthContext } from "../../Provider/AuthProvider";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";

import { FaEye } from "react-icons/fa6";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const MyArticles = () => {
  const { articles, refetch } = useArticles();
  const { user } = useContext(AuthContext);
  const myArticles = articles.filter(
    (article) => article.authorEmail === user?.email
  );

  const handleDelete = (id) => {
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
          .delete(`http://localhost:5000/articles/${id}`, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              toast.success("Article Deleted");
            }
          });
      }
    });
  };

  return (
    <div>
      <SectionTitle heading="My Articles"></SectionTitle>
      <div>
        <div className="overflow-x-auto px-5">
          <table className="table text-center">
            {/* head */}
            <thead>
              <tr>
                <th>Serial</th>
                <th>Title</th>
                <th>Action</th>
                <th>Status</th>
                <th>isPremium</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {/* row 1 */}
              {myArticles &&
                myArticles.map((article, idx) => (
                  <tr key={article._id}>
                    <td>{idx + 1}</td>
                    <td>{article.title}</td>
                    <td>
                      <button className="btn bg-green-400 hover:bg-green-500">
                        Details
                      </button>
                    </td>
                    <td>
                      {article.status === "Declined" ? (
                        <div className="flex justify-center items-center gap-2">
                          {article.status}{" "}
                          <button
                            onClick={() =>
                              document
                                .getElementById(`my_modal_${article._id}`)
                                .showModal()
                            }
                            className="text-xl">
                            <FaEye></FaEye>
                          </button>
                        </div>
                      ) : (
                        <>{article.status}</>
                      )}
                    </td>
                    <td>
                      {article.isPremium ? (
                        <>
                          <p>Yes</p>
                        </>
                      ) : (
                        <>
                          <p>No</p>
                        </>
                      )}
                    </td>
                    <td>
                      <Link to={`/updateArticle/${article._id}`}>
                        <button className="btn bg-fuchsia-400 hover:bg-fuchsia-500">
                          Update
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(article._id)}
                        className="btn bg-red-400 hover:bg-red-500">
                        Delete
                      </button>
                    </td>
                    <dialog
                      id={`my_modal_${article._id}`}
                      className="modal modal-bottom sm:modal-middle">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">
                          Cause of declining
                        </h3>
                        <p className="py-4">{article.declineReason}</p>
                        <div className="modal-action">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyArticles;
