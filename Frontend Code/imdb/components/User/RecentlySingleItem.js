import Image from "next/image";
import Link from "next/link";
import React from "react";
import useGetSingleMovie from "../../hooks/useGetSingleMovie";
import Loader from "../Loader";

const RecentlySingleItem = ({ movieID }) => {
    const imgurl = "https://image.tmdb.org/t/p/original";
    const { data, isLoading, isError } = useGetSingleMovie(movieID);
    const poster = data && imgurl + data.poster_path;
    const title = data && data.title;
    const mvLink = "/movie/" + movieID;

    return (
        <>
            <Link href={mvLink}>
                <a>
                    <div className="recently_movie mx-1 md:mx-5 mb-12 flex-none">
                        <Loader show={isLoading} />
                        <Image
                            src={poster}
                            width={150}
                            height={225}
                            className="rounded-xl recently_movie_img"
                            alt={movieID}
                        />
                        <h4 className="text-white text-truncate recently_movie_title">{title}</h4>
                    </div>
                </a>
            </Link>
        </>
    );
};

export default RecentlySingleItem;
