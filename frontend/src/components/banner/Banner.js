import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation"
import { Swiper, SwiperSlide } from "swiper/react";



function Banner(){
    return (
        <Swiper 
            navigation
            modules={[Navigation, Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: true }}
            pagination={{ clickable: true }}
            speed={1000}
            slidesPerView={1}
            loop
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
                <div className='mt-[-1px] bg-[#7C5C9DE5] text-center p-2 text-[17px] max-sm:text-[15px]'>
                    <span className='font-sans text-white font-semibold'>Você é um Microempreender? Junte-se a nós! <a className='font-black cadastro-desenvolvedor underline hover:opacity-95' href="/cadastro-desenvolvedor">Cadastre-se</a></span>
                </div>
            </SwiperSlide>
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
                <div className='mt-[-1px] bg-[#7C5C9DE5] text-center p-2 text-[17px] max-sm:text-[15px]'>
                    <span className='font-sans text-white font-semibold'>Você é um desenvolvedor? Junte-se a nós! <a className='font-black cadastro-desenvolvedor underline hover:opacity-95' href="/cadastro-desenvolvedor">Cadastre-se</a></span>
                </div>
            </SwiperSlide>
        </Swiper>

    )
}

export default Banner;