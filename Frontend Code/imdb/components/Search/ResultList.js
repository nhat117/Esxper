import React from "react";
import ResultItem from "./ResultItem";

const ResultList = ({ data }) => {
    return (
        <>
            <div className="grid grid-cols-2 gap-x-1 gap-y-4 md:grid-cols-4 md:gap-x-4 md:gap-y-4">
                {data &&
                    data.map((e, i) => {
                        return (
                            <ResultItem key={i} id={e.id} title={e.title} poster={e.poster_path} release_date={e.release_date} />
                        );
                    })}
            </div>
        </>
    );
};

export default ResultList;
