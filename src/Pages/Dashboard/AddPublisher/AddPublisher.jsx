import axios from "axios";
import SectionTitle from "../../../components/Shared/SectionTitle/SectionTitle";
import { toast } from "react-toastify";

const AddPublisher = () => {
  const handleAddPublisher = (e) => {
    e.preventDefault();
    const form = e.target;
    const publisher = {
      name: form.name.value,
      logo: form.logo.value,
    };

    axios.post("http://localhost:5000/publishers", publisher).then((res) => {
      if (res.data.insertedId) {
        toast.success("Publisher Added Successfully");
        form.reset();
      }
    });
  };

  return (
    <div className="px-8">
      <SectionTitle
        heading="Add Publisher"
        subHeading="Need new partner?"></SectionTitle>
      <form onSubmit={handleAddPublisher}>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xl font-semibold">
              Publisher Name
            </span>
          </label>
          <input
            type="text"
            placeholder="Type Here"
            className="input input-bordered"
            name="name"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xl font-semibold">Logo URL</span>
          </label>
          <input
            type="text"
            placeholder="Provide publisher logo url"
            className="input input-bordered"
            name="logo"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn mt-5 bg-green-400 hover:bg-green-500">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPublisher;
