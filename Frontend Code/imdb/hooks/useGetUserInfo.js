import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useGetUserInfo = (id) => {
    const getUserInfoURL = "https://l9r8bafvh6.execute-api.ap-southeast-1.amazonaws.com/test/users/" + id;

    const { data, error } = useSWR(getUserInfoURL, fetcher);

    return {
        data,
        gender: data.GENDER,
        email: data.EMAIL,
        name: data.NAME,
        age: data.AGE,
        recentlyViews: data.IDS_OF_RECENTLY_VIEWED_MOVIES,
        ratedMovies: data.IDS_OF_RATED_MOVIES,
        isDataLoading: !data && !error,
        isError: error,
    };
};

export default useGetUserInfo;
