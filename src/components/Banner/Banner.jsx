import useArticles from "../../hooks/useArticles";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";

const Banner = () => {
  const { articles } = useArticles();
  const sortedArticles = articles.slice().sort((a, b) => b.views - a.views);

  return (
    <div>
      <SectionTitle
        heading="Trending Now"
        subHeading="All over the world"></SectionTitle>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 50000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper">
        {articles &&
          sortedArticles.slice(0, 6).map((article) => (
            <SwiperSlide key={article._id}>
              <div className="card card-compact bg-base-100 shadow-xl">
                <figure>
                  <img
                    className="h-[600px] w-full"
                    src={article.image}
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{article.title}</h2>
                  <p>{article.views}</p>
                  <p>{article.details.slice(0, 300)}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Banner;
