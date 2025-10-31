import { useNavigate } from "react-router-dom";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation"
import { Swiper, SwiperSlide } from "swiper/react";



function BannerDesenvolvedor(){
    return (
        <Swiper 
            navigation
            modules={[Navigation, Autoplay, Pagination]}
            pagination={{ clickable: true }}
            speed={1000}
            slidesPerView={1}
        >
            <SwiperSlide>
                <div className='relative flex items-center max-md:justify-center'>
                    <img src="/images/slider-2.png" alt="slide-1" width={'100%'}/>
                    <div
                        className='absolute z-1 w-1/3 md:ml-[257px]'
                    >
                        <span className='font-sans font-black text-white text-[48px] max-lg:text-[24px] max-sm:text-[17px]'>VOCÊ É UM DESENVOLVEDOR?</span>
                        <p className='mt-[70px] max-lg:mt-[35px] max-sm:mt-[17px] cursor-pointer hover:opacity-90 opacity-100 bg-[#7c5c9d] p-2 max-sm:p-1 text-white font-sans font-semibold text-[20px] max-lg:text-[15px] rounded-3xl w-[300px] max-md:w-64 text-center'>Quero expor meus projetos</p>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>

    )
}

export default BannerDesenvolvedor;