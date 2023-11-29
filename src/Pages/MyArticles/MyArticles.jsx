import { useContext } from "react";
import useArticles from "../../hooks/useArticles";
import { AuthContext } from "../../Provider/AuthProvider";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
import { FaUserFriends } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

const MyArticles = () => {
  const { articles } = useArticles();
  const { user } = useContext(AuthContext);
  const myArticles = articles.filter(
    (article) => article.authorEmail === user?.email
  );

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
                  <tr key={user._id}>
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
                          <button className="text-xl">
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
                      <button className="btn bg-fuchsia-400">Update</button>
                    </td>
                    <td>
                      <button className="btn bg-red-400">Delete</button>
                    </td>
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
