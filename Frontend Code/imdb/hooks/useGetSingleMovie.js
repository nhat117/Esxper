import useSWRImmutable from "swr/immutable";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useGetSingleMovie = (id) => {
    const getSingleMovieURL = `https://l9r8bafvh6.execute-api.ap-southeast-1.amazonaws.com/test/movie/${id}`;

    const { data, error } = useSWRImmutable(id ? getSingleMovieURL : null, fetcher);

    return {
        data,
        isLoading: !data && !error,
        isError: error,
    };
};

export default useGetSingleMovie;
