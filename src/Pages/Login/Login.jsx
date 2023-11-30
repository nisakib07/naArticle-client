import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Login = () => {
  const { userSignIn, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    userSignIn(email, password)
      .then(() => {
        navigate(from, { replace: true });
        toast.success("Logged In Successfully");
        reset();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleGoogleLogin = () => {
    googleSignIn()
      .then((res) => {
        const userInfo = {
          name: res.user.displayName,
          email: res.user.email,
          image: res.user.photoURL,
          role: "user",
          expireTime: 0,
          buyingDate: 0,
        };
        axios.post("https://assignmentb8-12-server.vercel.app/users", userInfo);
        navigate(from, { replace: true });
        toast.success("Logged In Successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div>
      <div>
        <div className="min-h-screen max-w-2xl mx-auto mt-5">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left"></div>
            <div className="card w-full shadow-2xl bg-base-100">
              <h1 className="text-3xl font-bold text-center mt-8">Login</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
                    })}
                  />
                </div>

                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn bg-[#d1a054b3] hover:bg-[#ddaf69b3] text-white">
                    Log In
                  </button>
                </div>
                <div className="mt-5 text-lg">
                  <p className="text-center">Or Sign In With</p>
                  <div className="flex justify-center">
                    <button onClick={handleGoogleLogin}>
                      <FcGoogle className="text-2xl mt-4"></FcGoogle>
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-[#D1A054] text-center mt-8 text-xl">
                    New Here?
                    <span className="font-semibold">
                      <Link to="/register"> Register Now!</Link>
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
