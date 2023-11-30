import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import animationData from "../../../src/assets/Animation - 1701316302565.json";

const ErrorPage = () => {
  return (
    <div className=" bg-blue-300 min-h-screen flex flex-col items-center justify-center">
      <Lottie animationData={animationData}></Lottie>

      <Link className="mt-10" to="/">
        <button className="btn bg-green-400 border-none hover:bg-green-500">
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
