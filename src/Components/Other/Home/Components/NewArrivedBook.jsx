import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import { Link, NavLink } from "react-router-dom";
const NewArrivedBook = ({data,title,route}) => {
    return (
        <div className="bg-[#1c2229]">
          <div className="flex px-5 items-center justify-between py-3">
            <h1 className="font-semibold text-xl">{title}</h1>
            <Link className=" btn btn-warning btn-sm font-normal text-lg">Show all</Link>
          </div>
            <Swiper
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
          pauseOnMouseEnter:true,
          stopOnLastSlide:true
          
        }}
        
        
        centeredSlides={false}
        
        navigation={false}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
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
            slidesPerView: 6,
            spaceBetween: 5
          }
        }}
        
      >
        {data?.map((item, idx) => (
          <SwiperSlide key={idx}>
            <NavLink to={`author/${item._id}`}>
              <div className=" flex hover:shadow-2xl hover:rounded-lg hover:shadow-stone-200 transition-all duration-500  my-4 border-white h-[300px] flex-col items-center justify-center">
               
                
                <div className="lg:w-[138px] w-[80px] lg:h-[190px] h-[80px]  overflow-hidden">
                  <img
                    className="w-full object-cover h-full"
                    src={item?.coverPhoto}
                    alt={item?.name}
                  />
                </div>
              
                <h1 className=" font-thin text-[10px] leading-[1.4] lg:text-base  mt-3 text-center">{item?.banglaName?.length<=30?item?.banglaName:item?.banglaName?.slice(0,25)+" "+"...."}</h1>
                <h1 className="text-center text-[#85d6ffa3]  h-[55px] font-normal text-base">{item?.authorName}</h1>
                </div>
              
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
        </div>
    );
};

export default NewArrivedBook;