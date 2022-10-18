import useSWRImmutable from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useGetCredits = (movieID) => {
    const castcrewurl =
        process.env.MV_DETAIL + movieID + "/credits" + "?api_key=" + process.env.TMDB_API_KEY + "&language=en-US";
    const { data, error } = useSWRImmutable(castcrewurl, fetcher);
    return {
        data_castcrew: data,
        isLoading: !error && !data,
        isError: error,
    };
};

export default useGetCredits;
