import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";
import { FaUserFriends } from "react-icons/fa";

import useAllUsers from "../../../hooks/useAllUsers";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";

const AllUsers = () => {
  const { users, refetch } = useAllUsers();

  const handleMakeAdmin = (id) => {
    Swal.fire({
      title: "Want to make Admin?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`https://assignmentb8-12-server.vercel.app/users/admin/${id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              toast.success("Admin Role Given");
            }
          });
      }
    });
  };

  return (
    <div>
      <SectionTitle
        heading="All Users"
        subHeading="All our users"></SectionTitle>

      <div>
        <div className="overflow-x-auto px-5">
          <table className="table text-center">
            {/* head */}
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {/* row 1 */}
              {users &&
                users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={user.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <th>
                      {user.role === "admin" ? (
                        <p>Admin</p>
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(user._id)}
                          className="btn btn-ghost text-xl">
                          <FaUserFriends></FaUserFriends>
                        </button>
                      )}
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
