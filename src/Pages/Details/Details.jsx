import { useQuery } from "@tanstack/react-query";
import { Blocks } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const Details = () => {
  const { id } = useParams();

  const { data: singleArticle, isLoading } = useQuery({
    queryKey: ["singleArticle"],
    queryFn: () =>
      fetch(`http://localhost:5000/articles/${id}`, {
        credentials: "include",
      }).then((res) => res.json()),
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

  const {
    title,
    tags,
    views,
    author,
    image,
    details,
    authorPhoto,
    publishedDate,
    publisher,
  } = singleArticle;

  return (
    <div className="mt-10 w-3/4 mx-auto">
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img src={image} className="w-full h-[550px]" alt="Shoes" />
        </figure>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="flex items-center gap-2">
              <FaEye></FaEye> {views}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 my-5">
              <img className="rounded-full w-12" src={authorPhoto} alt="" />
              <div>
                <p className="text-lg font-medium">{author}</p>
                <p className="font-light">Posted On : {publishedDate}</p>
              </div>
            </div>
            <p className="text-lg font-medium">{publisher}</p>
          </div>
          <p className="text-justify">{details}</p>
          <div className="card-actions justify-end mt-5">
            {tags &&
              tags.map((tag, idx) => (
                <div key={idx} className="badge badge-outline">
                  {tag}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
