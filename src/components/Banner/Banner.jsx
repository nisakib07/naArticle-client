import useArticles from "../../hooks/useArticles";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";

const Banner = () => {
  const { articles } = useArticles();
  const approvedArticles = articles.filter(
    (article) => article?.status === "Approved"
  );
  const sortedArticles = approvedArticles
    .slice()
    .sort((a, b) => b.views - a.views);

  return (
    <div>
      <SectionTitle
        heading="Trending Now"
        subHeading="All over the world"></SectionTitle>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper">
        {sortedArticles &&
          sortedArticles.slice(0, 6).map((article) => (
            <SwiperSlide key={article._id}>
              <div className="shadow-xl flex flex-col md:flex-row rounded-xl bg-blue-300 p-4">
                <img
                  className="h-[600px] w-[600px]"
                  src={article.image}
                  alt="Shoes"
                />
                <div className="card-body">
                  <h1 className="text-5xl font-semibold">{article.title}</h1>
                  <p className="text-2xl mt-7">
                    {article.details.slice(0, 300)}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Banner;
