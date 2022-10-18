import Image from "next/image";
import Link from "next/link";
import React from "react";
import moment from "moment";
const ResultItem = ({ poster, id, title, release_date }) => {
    const posterpath = "https://image.tmdb.org/t/p/original/" + poster;
    const mvLink = "/movie/" + id;

    return (
        <>
            <Link href={mvLink}>
                <a>
                    <div className="flex">
                        <div className="movie_search_card my-auto">
                            <img src={posterpath} alt={title} className="mx-auto mt-1 md:mt-3 movie_search_img" />
                            <h4 className="text-white text-xs md:text-base mx-auto mt-1 md:mt-2 w-fit h-fit text-truncate movie_search_title">
                                {title}
                            </h4>
                            <p className="text-gray-300 text-xs md:text-base mx-auto w-fit h-fit movie_search_title">
                                {moment(release_date).format("YYYY")}
                            </p>
                        </div>
                    </div>
                </a>
            </Link>
        </>
    );
};

export default ResultItem;
