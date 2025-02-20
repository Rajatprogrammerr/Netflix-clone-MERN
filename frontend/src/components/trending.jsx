import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ChevronRight, ChevronLeft } from 'lucide-react';

import slide_image_1 from '../assets/Img1.webp';
import slide_image_2 from '../assets/Img2.webp';
import slide_image_3 from '../assets/Img3.webp';
import slide_image_4 from '../assets/Img4.webp';
import slide_image_5 from '../assets/Img5.webp';
import slide_image_6 from '../assets/Img6.webp';
import slide_image_7 from '../assets/Img7.webp';
import slide_image_8 from '../assets/Img8.webp';
import slide_image_9 from '../assets/Img9.webp';
import slide_image_10 from '../assets/Img10.webp';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

export const Trending = () => {
    return (
        <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={"auto"}
            breakpoints={{
                320: { slidesPerView: 1 },
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 5 },
                1280: { slidesPerView: 6 }
            }}
            coverflowEffect={{
                rotate: 0,
                stretch: 20,
                depth: 50,
                modifier: 2.5,
            }}
            pagination={{ el: '.swiper-pagination', clickable: true }}
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true,
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="swiper_container w-full mb-24 "
        >
            {[slide_image_1, slide_image_2, slide_image_3, slide_image_4, slide_image_5, slide_image_6, slide_image_7, slide_image_8, slide_image_9, slide_image_10].map((image, index) => (
                <SwiperSlide key={index}>
                    <img src={image} alt={`slide_image_${index + 1}`} className="w-full h-auto" />
                </SwiperSlide>
            ))}

            <div className="slider-controler flex justify-between items-center px-4">
                <div className="swiper-button-prev slider-arrow text-white text-3xl cursor-pointer">
                    <ChevronLeft />
                </div>
                <div className="swiper-button-next slider-arrow text-white text-3xl cursor-pointer">
                    <ChevronRight />
                </div>
            </div>
        </Swiper>
    );
};

export default Trending;
