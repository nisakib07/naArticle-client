import axios from "axios";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
import useArticles from "../../hooks/useArticles";
import AllArticlesHomeCard from "./AllArticlesHomeCard";
import { useForm } from "react-hook-form";
import usePublishers from "../../hooks/usePublishers";
import { useState } from "react";
import { Blocks } from "react-loader-spinner";

const AllArticlesHome = () => {
  const { articles, isLoading } = useArticles();

  const { publishers } = usePublishers();
  const approvedArticles = articles.filter(
    (article) => article.status === "Approved"
  );

  console.log(approvedArticles);
  const [searchedArticles, setSearchedArticles] = useState(approvedArticles);

  const { register, handleSubmit } = useForm();

  const publisherSearch = (data) => {
    const publisher = data.publisher;

    axios
      .get(`http://localhost:5000/articles/searchPublisher/${publisher}`)
      .then((res) => {
        setSearchedArticles(res.data);
      });
  };
  const titleSearch = (data) => {
    const title = data.title;

    axios
      .get(`http://localhost:5000/articles/searchTitle/${title}`)
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {searchedArticles &&
            searchedArticles.map((article) => (
              <AllArticlesHomeCard
                key={article._id}
                article={article}></AllArticlesHomeCard>
            ))}
        </div>
      )}
    </div>
  );
};

export default AllArticlesHome;

AllArticlesHome.jsx;
