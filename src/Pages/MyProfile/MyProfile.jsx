import { useForm } from "react-hook-form";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
import useSingleUser from "../../hooks/useSingleUser";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { currentUser, refetch } = useSingleUser();
  const { email, name, image, role } = currentUser;
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const updatedProfile = {
      name: data.name,
      email: email,
      image: data.image,
    };

    axios
      .put(
        `https://assignmentb8-12-server.vercel.app/users/email?email=${email}`,
        updatedProfile
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          toast.success("Profile Updated");
          refetch();
        }
      });
  };

  return (
    <div>
      <SectionTitle heading="My Profile"></SectionTitle>

      <div className="card lg:card-side bg-base-100 shadow-xl mb-6">
        <figure>
          <img className="h-full w-[300px]" src={image} alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>Email : {email}</p>
          <p>Role : {role}</p>
        </div>
      </div>

      <div className="bg-blue-300 min-h-screen p-7">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl font-semibold">Name</span>
            </label>
            <input
              type="text"
              placeholder="Type Here"
              className="input input-bordered"
              required
              {...register("name")}
            />
          </div>
          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">Email</span>
              </label>
              <input
                type="text"
                placeholder="Type Here"
                className="input input-bordered"
                defaultValue={email}
                name="email"
                required
                readOnly
                {...register("email")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">
                  Image URL
                </span>
              </label>
              <input
                type="text"
                placeholder="Give Image URL"
                className="input input-bordered"
                name="image"
                required
                {...register("image")}
              />
            </div>
            <div className="flex justify-center mt-5">
              <button
                type="submit"
                className="btn bg-green-400 border-none hover:bg-green-500">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
