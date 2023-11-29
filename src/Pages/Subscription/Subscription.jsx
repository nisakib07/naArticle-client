import { useState } from "react";

const Subscription = () => {
  const [selectedDuration, setSelectedDuration] = useState("default");
  const [cost, setCost] = useState(""); // Initialize with an empty string

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Duration:", selectedDuration);
    console.log("Cost:", cost);
    // You can proceed with your form submission logic here
  };

  const handleSelectDuration = (e) => {
    let duration = parseInt(e.target.value);
    setSelectedDuration(duration);

    if (duration === 1) {
      setCost("10");
    } else if (duration === 5) {
      setCost("100");
    } else if (duration === 10) {
      setCost("150");
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
            defaultValue={cost} // Set defaultValue instead of value
            readOnly
            name="cost"
          />
        </div>
        <button type="submit" className="btn">
          Buy
        </button>
      </form>
    </div>
  );
};

export default Subscription;
