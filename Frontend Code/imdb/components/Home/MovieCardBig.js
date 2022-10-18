import React from "react";
import Link from "next/link";

const MovieCardBig = ({ id, title, rating, poster }) => {
    const posterpath = "https://image.tmdb.org/t/p/original" + poster;
    const bg = "linear-gradient(180deg, rgba(29, 29, 29, 0) 0%, rgba(29, 29, 29, 0.8) 80.79%), url(" + posterpath + ") no-repeat center / cover";
    const mvLink = "/movie/" + id;
    const ratings = parseFloat(rating).toFixed(2);

    return (
        <>
            <div
                style={{ background: bg }}
                className="text-white movie_card_big mx-auto overflow-hidden"
            >
                <Link href={mvLink}>
                    <a>
                        <div className="movie_card_big">
                            <div className="px-8 movie_card_big_pt">
                                <p className="mb-4 border-transparent border-gray-500 rounded-xl w-fit text-base md:text-xl bg-gray-400 bg-opacity-10 px-3 py-2 backdrop-blur-lg text-warning-500">
                                    <i className="bi bi-star-fill text-base md:text-xl"></i> {ratings}
                                </p>
                                <h4 className="text-2xl md:text-5xl text-truncate homecard_title">{title}</h4>
                            </div>
                        </div>
                    </a>
                </Link>
            </div>
        </>
    );
};

export default MovieCardBig;
