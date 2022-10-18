import React, { useEffect, useRef, useState } from "react";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCardSmall from "./MovieCardSmall";
import useGetMovies from "../../hooks/useGetMovies";
import Loader from "../Loader";

const MovieListSmall = () => {
    const { topRatedMovies, isLoadingTopRated, isErrorTopRated } = useGetMovies();

    return (
        <>
            <Loader show={isLoadingTopRated} />

            <div className="hidden lg:block">
                <Swiper
                    // install Swiper modules
                    // modules={[Navigation, Pagination, Autoplay]}
                    modules={[Navigation, Pagination]}
                    slidesPerView={4}
                    spaceBetween={24}
                    // autoplay={{
                    //     enabled: true,
                    //     delay: 5000,
                    //     disableOnInteraction: true,
                    // }}
                    pagination={{
                        enabled: true,
                        clickable: true,
                    }}
                    navigation={{
                        enabled: true,
                    }}
                    // observer={true}
                >
                    {topRatedMovies &&
                        topRatedMovies.map((e, i) => {
                            return (
                                <SwiperSlide key={i}>
                                    <MovieCardSmall
                                        id={e.id}
                                        title={e.title}
                                        rating={e.rating}
                                        poster={e.poster_path}
                                    />
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
            </div>
            <div className="block lg:hidden">
                <Swiper
                    // install Swiper modules
                    // modules={[Navigation, Autoplay]}
                    modules={[Navigation]}
                    slidesPerView={2}
                    spaceBetween={12}
                    navigation={{
                        enabled: true,
                    }}
                    // autoplay={{
                    //     enabled: true,
                    //     delay: 3000,
                    //     disableOnInteraction: true,
                    // }}
                >
                    {topRatedMovies &&
                        topRatedMovies.map((e, i) => {
                            return (
                                <SwiperSlide key={i}>
                                    <MovieCardSmall
                                        id={e.id}
                                        title={e.title}
                                        rating={e.rating}
                                        poster={e.poster_path}
                                    />
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
            </div>
        </>
    );
};

export default MovieListSmall;
