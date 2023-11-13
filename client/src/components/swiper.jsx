/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination,  Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Slider = ({ slides }) => {
  return (
    <Swiper
      modules={[ Pagination, Scrollbar, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      effect={"cube"}
      Autoplay={ {
        delay: 2500,
        disableOnInteraction: false,}
        }
    >
      {slides &&
        slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img className="w-full h-[500px]" src={slide.image} alt={slide.title} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Slider;
