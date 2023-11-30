import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = () => {
  const { createUser, userProfileUpdate } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    const name = data.name;
    const photoURL = data.photoURL;

    createUser(email, password)
      .then(() => {
        userProfileUpdate(name, photoURL).then(() => {
          const userInfo = {
            name: name,
            email: email,
            image: photoURL,
            role: "user",
            expireTime: 1,
            buyingDate: 0,
          };
          axios.post("http://localhost:5000/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              toast.success("User Created Successfully");
              reset();
              navigate("/");
            }
          });
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div>
      <div className="min-h-screen max-w-2xl mx-auto mt-5">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left"></div>
          <div className="card w-full shadow-2xl bg-base-100">
            <h1 className="text-3xl font-bold text-center mt-8">Register</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl font-semibold">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Type Here"
                  className="input input-bordered"
                  name="text"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500 mt-2 text-center">
                    Name is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl font-semibold">
                    Photo URL
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Type Here"
                  className="input input-bordered"
                  {...register("photoURL", { required: true })}
                />
                {errors.photoURL && (
                  <span className="text-red-500 mt-2 text-center">
                    Photo is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl font-semibold">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="Type Here"
                  className="input input-bordered"
                  name="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500 mt-2 text-center">
                    Email is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl font-semibold">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered"
                  name="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).+$/,
                  })}
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-500 mt-2 text-center">
                    Password is required
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-500 mt-2 text-center">
                    Password must have at least 6 characters
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-500 mt-2 text-center">
                    Password must have at least <br /> one capital letter and{" "}
                    special character
                  </span>
                )}
              </div>

              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn bg-[#d1a054b3] hover:bg-[#ddaf69b3] text-white">
                  Sign Up
                </button>
              </div>
              <div>
                <p className="text-[#D1A054] text-center mt-8 text-xl">
                  Already Registered?
                  <span className="font-semibold">
                    <Link to="/login"> Go to log in</Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
