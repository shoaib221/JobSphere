import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
    {
        image: "https://www.flatworldsolutions.com/featured-images/search-engine-optimization-services.jpg",
        title: "Search Engine Optimization",
    },
    {
        image: "https://www.creative-tim.com/blog/content/images/2022/01/which-development-job-is-right-for-you.jpg",
        title: "Web development",
    },
    {
        image: "https://contentwriters.com/blog/wp-content/uploads/PPC2018.jpg",
        title: "Content Writing",
    },
    {
        image: "https://www.internationalcourierservices.org/slider1.jpg",
        title: "Parcel Delivery",
    },
    {
        image: "https://www.tourpluscyprus.com/wp-content/uploads/2025/10/rent_a_caar.jpeg",
        title: "Rent a vehicle",
    },
];

export function Banner1() {
    return (
        /* Outer lock */
        <div className="relative w-full max-w-full min-w-0  px-2 rounded-xl">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                loop
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                className="w-full max-w-full min-w-0  h-[260px]  lg:h-[400px] rounded-xl"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="w-full min-w-0 ">
                        <div
                            className="relative w-full h-full bg-cover bg-center  rounded-xl"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />

                            {/* Title */}
                            <div className="relative z-10 flex h-full items-start p-4 sm:p-6 md:p-10">
                                <h2 className="text-lg sm:text-2xl md:text-4xl font-bold text-white tracking-wide">
                                    {slide.title}
                                </h2>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}