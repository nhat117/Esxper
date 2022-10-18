import React from "react";
import Link from "next/link";

const MovieCardSmall = ({ id, title, rating, poster }) => {
    const posterpath = "https://image.tmdb.org/t/p/original" + poster;
    const bg = "linear-gradient(180deg, rgba(29, 29, 29, 0) 0%, rgba(29, 29, 29, 0.8) 80.79%), url(" + posterpath + ") no-repeat center / cover";
    const mvLink = "/movie/" + id;
    const ratings = parseFloat(rating).toFixed(2);
    return (
        <>
            <div
                style={{ background: bg, borderRadius: 20 }}
                className="text-white mx-auto overflow-hidden movie_card_small"
            >
                <Link href={mvLink}>
                    <a>
                        <div className="movie_card_small">
                            <div className="px-6 movie_card_small_pt">
                                <p className="mb-2 md:mb-4 border-transparent border-gray-500 rounded-xl w-fit text-xs md:text-sm bg-gray-400 bg-opacity-10 px-2 py-1 md:px-3 md:py-2 backdrop-blur-lg text-warning-500 hidden md:block">
                                    <i className="bi bi-star-fill md:text-sm"></i> {ratings}
                                </p>
                                <h4 className="text-base md:text-2xl text-truncate homecard_title">{title}</h4>
                            </div>
                        </div>
                    </a>
                </Link>
            </div>
        </>
    );
};

export default MovieCardSmall;
