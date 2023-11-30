import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useSubscribed = () => {
  const { user } = useContext(AuthContext);
  return <div></div>;
};

export default useSubscribed;
