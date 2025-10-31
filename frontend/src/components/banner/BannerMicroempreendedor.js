import { useNavigate } from "react-router-dom";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation"
import { Swiper, SwiperSlide } from "swiper/react";



function BannerMicroempreendedor(){
    return (
        <Swiper 
            navigation
            modules={[Navigation, Autoplay, Pagination]}
            // autoplay={{ delay: 3000, disableOnInteraction: true }}
            pagination={{ clickable: true }}
            speed={1000}
            slidesPerView={1}
            // loop
        >
            <SwiperSlide>
                <div className='relative flex items-center max-lg:justify-center'>
                    <img src="/images/slider-1.png" alt="slide-1" width={'100%'}/>
                    <div
                        className='absolute w-1/2 lg:ml-[257px] max-lg:w-64'
                    >
                        <span className='font-sans font-black text-white text-[40px] max-lg:text-[20px] max-sm:text-[15px]'>O SISTEMA IDEAL PARA MICROEMPREENDEDORES?</span>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    )
}

export default BannerMicroempreendedor;