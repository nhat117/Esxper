import React from "react";
import RecentlySingleItem from "./RecentlySingleItem";

const RecentlyList = ({ items }) => {
    return (
        <div className="flex flex-nowrap mb-10 scroller">
            {items &&
                items.map((e, i) => {
                    return (
                        <>
                            <RecentlySingleItem key={i} movieID={e} />
                        </>
                    );
                })}
        </div>
    );
};

export default RecentlyList;
