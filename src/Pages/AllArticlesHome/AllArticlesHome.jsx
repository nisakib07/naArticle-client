import axios from "axios";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
import useArticles from "../../hooks/useArticles";
import AllArticlesHomeCard from "./AllArticlesHomeCard";
import { useForm } from "react-hook-form";
import usePublishers from "../../hooks/usePublishers";
import { useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";
import Select from "react-select";

const AllArticlesHome = () => {
  const { articles, isLoading, refetch } = useArticles();

  const [selectedTags, setSelectedTags] = useState([]);

  const { publishers } = usePublishers();

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

  const [searchedArticles, setSearchedArticles] = useState([]);
  useEffect(() => {
    if (!isLoading) {
      const approvedArticles = articles.filter(
        (article) => article.status === "Approved"
      );
      setSearchedArticles(approvedArticles);
    }
  }, [isLoading]);

  const { register, handleSubmit, reset } = useForm();

  const publisherSearch = (data) => {
    const publisher = data.publisher;

    axios
      .get(
        `https://assignmentb8-12-server.vercel.app/articles/searchPublisher/${publisher}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setSearchedArticles(res.data);
        reset();
      });
  };
  const titleSearch = (data) => {
    const title = data.title;

    axios
      .get(
        `https://assignmentb8-12-server.vercel.app/articles/searchTitle/${title}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setSearchedArticles(res.data);
        reset();
      });
  };

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  const onSubmit = () => {
    const tags = selectedTags.map((option) => option.value);

    axios
      .get(
        `https://assignmentb8-12-server.vercel.app/articles/searchTags/tags`,

        {
          params: {
            tags: tags,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setSearchedArticles(res.data);
      });
  };

  return (
    <div className="px-5">
      <SectionTitle heading="All Articles"></SectionTitle>
      <div>
        {/* Publisher */}
        <form onSubmit={handleSubmit(publisherSearch)}>
          <div>
            <div className=" forms-control">
              <label className="label">
                <span className="label-text text-xl font-semibold">
                  Publisher
                </span>
              </label>
              <div className="flex gap-6">
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
                <button type="submit" className="btn">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Title */}
      <div>
        <form onSubmit={handleSubmit(titleSearch)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl font-semibold">Title</span>
            </label>
            <div className="flex gap-6">
              <input
                type="text"
                placeholder="Type Here"
                className="input input-bordered w-full"
                {...register("title")}
              />
              <button className="btn" type="submit">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Tags */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-xl font-semibold">Tags</span>
        </label>
        <div className="flex gap-6 items-center">
          <Select
            isMulti
            className="w-full"
            options={options}
            onChange={handleTagChange}
            value={selectedTags}
          />
          <button
            type="submit"
            className="btn"
            onClick={handleSubmit(onSubmit)}>
            Search
          </button>
        </div>
      </div>

      {isLoading ? (
        <Blocks
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {searchedArticles &&
            searchedArticles?.map((article) => (
              <AllArticlesHomeCard
                key={article._id}
                article={article}
                refetch={refetch}></AllArticlesHomeCard>
            ))}
        </div>
      )}
    </div>
  );
};

export default AllArticlesHome;

AllArticlesHome.jsx;
