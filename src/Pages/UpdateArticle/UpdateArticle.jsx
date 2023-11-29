import { useQuery } from "@tanstack/react-query";
import { Blocks } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
import { useContext } from "react";
import usePublishers from "../../hooks/usePublishers";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

const UpdateArticle = () => {
  const { id } = useParams();
  const { control, register, handleSubmit, reset, setValue } = useForm();

  const { user } = useContext(AuthContext);
  const image_hosting_key = import.meta.env.VITE_Image_Hosting_Key;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const { publishers } = usePublishers();
  const {
    data: singleArticle,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["singleArticle"],
    queryFn: () =>
      fetch(`http://localhost:5000/articles/${id}`).then((res) => res.json()),
  });
  if (isLoading)
    return (
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    );

  const options = [
    { value: "sports", label: "Sports" },
    { value: "cricket", label: "Cricket" },
    { value: "bangladesh", label: "Bangladesh" },
    { value: "international", label: "International" },
    { value: "football", label: "Football" },
    { value: "meditation", label: "Meditation" },
    { value: "health", label: "Health" },
    { value: "religion", label: "Religion" },
    { value: "islam", label: "Islam" },
    { value: "education", label: "Education" },
    { value: "web", label: "Web" },
    { value: "war", label: "War" },
    { value: "basketball", label: "Basketball" },
    { value: "election", label: "Election" },
    { value: "disease", label: "Disease" },
    { value: "diabetes", label: "Diabetes" },
    { value: "harassment", label: "Harassment" },
    { value: "economy", label: "Economy" },
    { value: "award", label: "Award" },
  ];

  const { _id, title, details, publishedDate, views, isPremium, status } =
    singleArticle;

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
        views: views,
        publisher: data.publisher,
        image: res.data.data.display_url,
        isPremium: isPremium,
        status: status,
        author: user?.displayName,
        authorEmail: user?.email,
        authorPhoto: user?.photoURL,
        publishedDate: data.publishedDate,
        details: data.details,
      };
      axios
        .put(`http://localhost:5000/articles/${_id}`, article)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            toast.success("Article Updated Successfully");
            reset();
            setValue("tags", null);
            refetch();
          }
        });
    }
  };

  return (
    <div>
      <SectionTitle heading="Update Article"></SectionTitle>
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
              defaultValue={title}
              className="input input-bordered"
              name="title"
              required
              {...register("title")}
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
              defaultValue={publishedDate}
              className="input input-bordered"
              name="publishedDate"
              required
              {...register("publishedDate")}
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
              required
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
              required
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
            required
            defaultValue={details}
            className="textarea textarea-bordered h-24"
            {...register("details")}
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
  );
};

export default UpdateArticle;
