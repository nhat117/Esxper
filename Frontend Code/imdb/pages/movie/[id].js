import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Head from "next/head";
import moment from "moment";
import MovieHeader from "../../components/MovieDetails/MovieHeader";
import MovieOverview from "../../components/MovieDetails/MovieOverview";
import useSWR from "swr";
import Footer from "../../components/Footer";

export async function getServerSideProps(context) {
    const movieID = context.params.id;
    const apiurl = "https://l9r8bafvh6.execute-api.ap-southeast-1.amazonaws.com/test/movie/" + movieID;
    const res = await fetch(apiurl, {
        method: "GET",
    });
    const data = await res.json();

    return {
        props: { data, movieID }, // will be passed to the page component as props
    };
}
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const MoviePage = ({ data, movieID }) => {
    const imgurl = "https://image.tmdb.org/t/p/original";
    const poster = imgurl + data.poster_path;
    const backdrop = imgurl + (data.backdrop_path || data.poster_path);
    const bg = "linear-gradient(180deg, rgba(54, 44, 146, 0.4) 0%, rgba(18, 98, 151, 0.4) 100%), url(" + backdrop + ")";
    const year = moment(data.release_date).format("YYYY");
    const genres = data.genres;
    const pageTitle = data.title + " - EXSPER";

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content="Home to the movie experts" />
                <link rel="icon" href="/logo.png" />
            </Head>
            <Header />

            {/**
             * Backdrop and Title
             */}
            <MovieHeader
                bg={bg}
                title={data.title}
                year={year}
                genres={genres}
                rating={parseFloat(data.rating).toFixed(2)}
            />
            {/**
             * Poster and Basic details
             */}
            <MovieOverview
                poster={poster}
                tagline={data.tagline}
                overview={data.overview}
                release_date={data.release_date}
                runtime={data.runtime}
                movieID={movieID}
            />
            {/**
             * Top Billed Cast
             */}

            <Footer />
        </>
    );
};
export default MoviePage;
