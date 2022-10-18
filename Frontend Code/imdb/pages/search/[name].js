import React from "react";
import ResultItem from "../../components/Search/ResultItem";
import ResultList from "../../components/Search/ResultList";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export async function getServerSideProps(context) {
    const movieName = context.params.name;
    const apiurl = "https://l9r8bafvh6.execute-api.ap-southeast-1.amazonaws.com/test/movies/search/" + movieName;
    const res = await fetch(apiurl, {
        method: "GET",
    });
    const data = await res.json();

    return {
        props: { data, movieName }, // will be passed to the page component as props
    };
}

const SearchPage = ({ data, movieName }) => {
    const pageTitle = "EXSPER - Search: " + movieName;
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content="Home to the movie experts" />
                <link rel="icon" href="/logo.png" />
            </Head>
            <Header />

            <div className="xs:mt-44 md:mt-32 flex justify-center">
                {data && data.length > 0 ? (
                    <>
                        <div>
                            <p className="text-2xl font-bold text-white mb-5">Search results for: {movieName}</p>
                            <ResultList data={data} />
                        </div>
                    </>
                ) : (
                    <p className="text-white">No results found</p>
                )}
            </div>

            <Footer />
        </>
    );
};

export default SearchPage;
