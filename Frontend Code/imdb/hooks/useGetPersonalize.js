import React from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { Auth } from "aws-amplify";
import { useUserData } from "./useUserData";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useGetPersonalize = (movieid) => {
    const { user, isLoading } = useUserData();
    const userid = user && user["custom:USER_ID"];
    const { data: topPicksData, error: topPicksError } = useSWRImmutable(
        user
            ? `https://z1hi6ssas5.execute-api.ap-southeast-1.amazonaws.com/getPersonalize?userId=${userid}&numResults=5`
            : null,
        fetcher
    );
    const { data: similarItemData, error: similarItemError } = useSWRImmutable(
        movieid
            ? `https://z1hi6ssas5.execute-api.ap-southeast-1.amazonaws.com/getSims?itemId=${movieid}&numResults=5`
            : null,
        fetcher
    );
    const { data: reRankingData, error: reRankingError } = useSWRImmutable(
        user
            ? `https://z1hi6ssas5.execute-api.ap-southeast-1.amazonaws.com/getReranking?userId=${userid}&itemId=${movieid}&numResults=5`
            : null,
        fetcher
    );

    return {
        topPicksData,
        isTopPickLoading: !topPicksData & !topPicksError,
        similarItemData,
        isSimilarLoading: !similarItemData & !similarItemError,
        reRankingData,
        isRerankingLoading: !reRankingData & !reRankingError,
    };
};

export default useGetPersonalize;
