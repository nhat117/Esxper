import React, { useEffect, useRef, useState } from "react";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCardBig from "./MovieCardBig";
import useGetMovies from "../../hooks/useGetMovies";
import Loader from "../Loader";

const MovieListBig = () => {
    const { mostViewedMovies, isLoadingMostViewed, isErrorMostViewed } = useGetMovies();

    return (
        <>
            <Loader show={isLoadingMostViewed} />

            <div className="hidden lg:block">
                <Swiper
                    // install Swiper modules
                    // modules={[Navigation, Pagination, Autoplay]}
                    modules={[Navigation, Pagination]}
                    slidesPerView={3}
                    spaceBetween={0}
                    pagination={{
                        enabled: true,
                        clickable: true,
                    }}
                    navigation={{
                        enabled: true,
                    }}
                    // autoplay={{
                    //     enabled: true,
                    //     delay: 5000,
                    //     disableOnInteraction: true,
                    // }}
                    // observer={true}
                >
                    {mostViewedMovies &&
                        mostViewedMovies.map((e, i) => {
                            return (
                                <SwiperSlide key={i}>
                                    <MovieCardBig id={e.id} title={e.title} rating={e.rating} poster={e.poster_path} />
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
                    slidesPerView={1}
                    spaceBetween={1}
                    navigation={{
                        enabled: true,
                    }}
                    // autoplay={{
                    //     enabled: true,
                    //     delay: 3000,
                    //     disableOnInteraction: true,
                    // }}
                >
                    {mostViewedMovies &&
                        mostViewedMovies.map((e, i) => {
                            return (
                                <SwiperSlide key={i}>
                                    <MovieCardBig id={e.id} title={e.title} rating={e.rating} poster={e.poster_path} />
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
            </div>
        </>
    );
};

export default MovieListBig;
