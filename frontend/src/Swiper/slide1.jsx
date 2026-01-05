import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

import './slide1-style.css'
import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../auth/context";
import { useNavigate } from "react-router-dom";
import "swiper/css/free-mode";
import { Loading } from "../miscel/Loading";


const scholarships = [
    { name: "Web Development" },
    { name: "Digital Marketing" },
    { name: "SEO Specialist" },
    { name: "Cyber Security" },
    { name: "Graphics Design" },
    { name: "Digital Marketing" },
    { name: "UI/UX" },
    { name: "Cloud Computing" },
]

export function InfiniteSlider() {
    

    

    return (
        <div className="w-full p-4 h-60">
            <Swiper
                
                className="h-full"
                modules={[Autoplay, FreeMode]}
                freeMode={true}
                loop={true}
                speed={3000}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                slidesPerView="auto"
                spaceBetween={20}
                allowTouchMove={false}
                breakpoints={{

                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                }}
            >
                {scholarships && scholarships.map((elem) => (
                    <SwiperSlide key={elem._id} className="h-full" >
                        <div
                            className="button-1 h-24 cen-ver"
                            
                        >
                            {elem.name}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
