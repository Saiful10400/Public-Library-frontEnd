import { useEffect, useState } from "react";
import { axiosPublic } from "../../../custom Hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import { NavLink } from "react-router-dom";
const AuthorSlide = () => {
  // getting all authors.
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    axiosPublic.get("/authors").then((res) => setAuthors(res.data));
  }, []);
  console.log(authors);


 
  
  return (
    <div className=" flex justify-center items-center">
      <Swiper
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
          pauseOnMouseEnter:true
        }}
        slidesPerView={5}
        centeredSlides={false}
        spaceBetween={30}
        navigation={false}
        modules={[Autoplay, Navigation]}
        className="mySwiper "
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 3,
            spaceBetween: 20,
            

          },
          // when window width is >= 480px
          480: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 4,
            spaceBetween: 40
          }
        }}
        
      >
        {authors?.map((item, idx) => (
          <SwiperSlide key={idx}>
            <NavLink to={`author/${item._id}`}>
              <div className=" flex flex-col items-center justify-center">
               
                <div className="lg:w-[120px] w-[95px] bg-gray-200 rounded-full flex justify-center items-center lg:h-[120px] h-[95px]">
                <div className="lg:w-[100px] w-[80px] lg:h-[100px] h-[80px] rounded-full overflow-hidden">
                  <img
                    className="w-full object-cover h-full"
                    src={item?.url}
                    alt={item?.name}
                  />
                </div>
                </div>
                <h1 className="  font-semibold text-[10px] leading-[1.4] lg:text-base  mt-2 text-center">{item?.name}</h1>
                </div>
              
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AuthorSlide;
