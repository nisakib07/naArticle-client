import { useForm, Controller } from "react-hook-form";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
import Select from "react-select";
import axios from "axios";
import usePublishers from "../../hooks/usePublishers";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";

const AddArticle = () => {
  const { control, register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);

  const { publishers } = usePublishers();
  const image_hosting_key = import.meta.env.VITE_Image_Hosting_Key;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const options = [
    { value: "sports", label: "Sports" },
    { value: "cricket", label: "Cricket" },
    { value: "bangladesh", label: "Bangladesh" },
    { value: "international", label: "International" },
    { value: "football", label: "Football" },
  ];

  const onSubmit = async (data) => {
    let tags = [];
    data?.tags.map((tag) => {
      tags.push(tag.value);
    });

    const imageFile = { image: data.image[0] };

    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const article = {
        title: data.title,
        tags: tags,
        views: 0,
        publisher: data.publisher,
        image: res.data.data.display_url,
        isPremium: false,
        isApproved: "Pending",
        author: user?.displayName,
        authorEmail: user?.email,
        publishedDate: data.publishedDate,
        details: data.details,
      };
      axios.post("http://localhost:5000/articles", article).then((res) => {
        if (res.data.insertedId) {
          toast.success("Article Added Successfully");
          reset();
        }
      });
    }
  };

  return (
    <div className="bg-blue-300 p-8">
      <SectionTitle
        heading="Add Article"
        subHeading="Show the world"></SectionTitle>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">Title</span>
              </label>
              <input
                type="text"
                placeholder="Type Here"
                className="input input-bordered"
                name="title"
                {...register("title", { required: true })}
              />
            </div>
            {/* author */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">Author</span>
              </label>
              <input
                type="text"
                placeholder="Type Here"
                className="input input-bordered"
                defaultValue={user?.displayName}
                readOnly
                name="title"
                {...register("author")}
              />
            </div>
          </div>

          {/* Author mail and date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mail */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">
                  Author Email
                </span>
              </label>
              <input
                type="email"
                placeholder="Type Here"
                className="input input-bordered"
                defaultValue={user?.email}
                readOnly
                name="authorEmail"
                {...register("authorEmail")}
              />
            </div>
            {/* Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">Date</span>
              </label>
              <input
                type="date"
                placeholder="Type Here"
                className="input input-bordered"
                name="publishedDate"
                {...register("publishedDate", { required: true })}
              />
            </div>
          </div>

          {/* Publisher and Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Publisher */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">
                  Publisher
                </span>
              </label>
              <select
                defaultValue="default"
                className="select select-bordered w-full"
                {...register("publisher")}>
                <option disabled value="default">
                  Select Publisher
                </option>

                {publishers &&
                  publishers.map((publisher) => (
                    <option key={publisher._id} value={publisher.name}>
                      {publisher.name}
                    </option>
                  ))}
              </select>
            </div>
            {/* Image */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">Image</span>
              </label>
              <input
                type="file"
                {...register("image")}
                className="file-input file-input-bordered w-full"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl font-semibold">Details</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              {...register("details", { required: true })}
              placeholder="Details"></textarea>
          </div>
          <div>
            <label className="label">
              <span className="label-text text-xl font-semibold">Tags</span>
            </label>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Select {...field} options={options} isMulti />
              )}
            />
          </div>
          <button
            type="submit"
            className="btn mt-3 w-full bg-green-400 border-none hover:bg-green-300 text-xl">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
