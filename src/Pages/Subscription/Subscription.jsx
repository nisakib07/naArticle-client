import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const Subscription = () => {
  const { setPrice, price, setDuration } = useContext(AuthContext);
  const [selectedDuration, setSelectedDuration] = useState("default");
  //   const [cost, setCost] = useState("");
  //   console.log(duration);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.patch("");
  };

  const handleSelectDuration = (e) => {
    let duration = parseInt(e.target.value);
    setSelectedDuration(duration);

    if (duration === 1) {
      setPrice("10");
      setDuration(1);
    } else if (duration === 5) {
      setPrice("100");
      setDuration(5);
    } else if (duration === 10) {
      setPrice("150");
      setDuration(10);
    }
  };

  return (
    <div className="mt-10 mx-5">
      <form onSubmit={handleSubmit}>
        <select
          onChange={handleSelectDuration}
          value={selectedDuration}
          required
          className="select select-bordered w-full">
          <option disabled value="default">
            Select Duration
          </option>
          <option value="1">1 Minute</option>
          <option value="5">5 Days</option>
          <option value="10">10 Days</option>
        </select>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-xl font-semibold">Cost</span>
          </label>
          <input
            type="text"
            placeholder="Type Here"
            className="input input-bordered"
            value={price}
            readOnly
            required
            name="cost"
          />
        </div>

        {selectedDuration === "default" ? (
          <button type="submit" className="btn" disabled>
            Buy
          </button>
        ) : (
          <Link to="/payment">
            <button type="submit" className="btn">
              Buy
            </button>
          </Link>
        )}
      </form>
    </div>
  );
};

export default Subscription;
