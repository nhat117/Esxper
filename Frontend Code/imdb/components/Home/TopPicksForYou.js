import React from "react";
import useGetPersonalize from "../../hooks/useGetPersonalize";
import TopPickItem from "./TopPickItem";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "../Loader";
import useSWRImmutable from "swr/immutable";
import { useUserData } from "../../hooks/useUserData";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const TopPicksForYou = () => {
    const { user, isLoading } = useUserData();
    const userid = user && user["custom:USER_ID"];
    const { data: topPicksData, error: topPicksError } = useSWRImmutable(
        user
            ? `https://z1hi6ssas5.execute-api.ap-southeast-1.amazonaws.com/getPersonalize?userId=${userid}&numResults=5`
            : null,
        fetcher
    );

    return (
        <>
            <Loader show={user && !topPicksData && !topPicksError} />
            {
                topPicksData && !topPicksError
                    ?
                    <>
                        <div className="mt-14 mb-11 pl-11 mt">
                            <h2 className="text-4xl text-white uppercase font-headings">Top picks for you</h2>
                        </div>
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
                                {topPicksData &&
                                    topPicksData.map((e, i) => {
                                        return (
                                            <SwiperSlide key={i}>
                                                <TopPickItem movieID={e} />
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
                                {topPicksData &&
                                    topPicksData.map((e, i) => {
                                        return (
                                            <SwiperSlide key={i}>
                                                <TopPickItem movieID={e} />
                                            </SwiperSlide>
                                        );
                                    })}
                            </Swiper>
                        </div>
                    </>
                    : null
            }
        </>
    );

    // return (
    //     <div className="scroller_wrap should_fade is_fading">
    //         <div className="flex flex-nowrap mb-10 scroller">
    //         {
    //             topPicksData && topPicksData.map((e, i) => {
    //                 return (
    //                     <>
    //                         <TopPickItem key={i} movieID={e} />
    //                     </>
    //                 )
    //             })
    //         }
    //         </div>
    //     </div>

    // )
};

export default TopPicksForYou;
