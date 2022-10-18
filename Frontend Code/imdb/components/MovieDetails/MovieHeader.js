import React from "react";

const MovieHeader = ({ bg, title, year, rating, genres }) => {
    return (
        <>
            <div
                className="text-white mx-auto w-10/12 xs:mt-44 md:mt-32 backdrop"
                style={{ background: bg, backgroundSize: "cover", backgroundPositionX: "center" }}
            >
                <div className="backdrop" style={{ display: "hidden" }} />
                <div className="movie-detail-title relative w-fit h-fit">
                    <h1 className="text-xl px-8 py-8 md:text-4xl md:px-12 md:py-12">
                        <span className="text-warning-500 text-base font-primary font-medium">
                            <i className="bi bi-star-fill text-lg"></i> {rating}
                        </span>
                        <br />
                        {title} <span className="text-gray-300 font-medium">({year})</span>
                        <br />
                        <span className="text-gray-300 text-sm md:text-base font-medium font-primary">
                            {genres &&
                                genres.map((e, i) => {
                                    if (i === genres.length - 1) {
                                        return <span key={e.id}>{e.name} </span>;
                                    }
                                    return (
                                        <span key={e.id}>
                                            {e.name} <i className="bi bi-dot"></i>{" "}
                                        </span>
                                    );
                                })}
                        </span>
                    </h1>
                </div>
            </div>
        </>
    );
};

export default MovieHeader;
