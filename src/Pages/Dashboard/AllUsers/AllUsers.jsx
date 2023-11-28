import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";
import useAllUsers from "../../../hooks/useAllUsers";

const AllUsers = () => {
  const { users } = useAllUsers();

  return (
    <div>
      <SectionTitle
        heading="All Users"
        subHeading="All our users"></SectionTitle>

      <div>
        <div className="overflow-x-auto px-5">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
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
                      <button className="btn btn-ghost btn-xs">
                        Make Admin
                      </button>
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
