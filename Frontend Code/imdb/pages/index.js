import Head from "next/head";
import Header from "../components/Header";
import dynamic from "next/dynamic";
import MovieCardSmall from "../components/Home/MovieCardSmall";
import MovieCardBig from "../components/Home/MovieCardBig";
import MovieListSmall from "../components/Home/MovieListSmall";
import MovieListBig from "../components/Home/MovieListBig";
import TopPicksForYou from "../components/Home/TopPicksForYou";
import Footer from "../components/Footer";

const HeaderDynamicCarousel = dynamic(() => import("../components/HeaderMovieCarousel"), {
    ssr: false,
});

export default function Home() {
    return (
        <>
            <Head>
                <title>EXSPER - Home to the movie experts</title>
                <meta name="description" content="Home to the movie experts" />
                <link rel="icon" href="/logo.png" />
            </Head>

            <Header />
            <div className="2xl:container mx-auto">
                <HeaderDynamicCarousel />
                <div>
                    <div className="mt-14 mb-11 pl-11">
                        <h2 className="text-4xl text-white uppercase font-headings">Top-rated</h2>
                    </div>
                    <MovieListSmall />
                </div>
                <div>
                    <div className="mt-14 mb-11 pl-11 mt">
                        <h2 className="text-4xl text-white uppercase font-headings">Most popular</h2>
                    </div>
                    <MovieListBig />
                </div>
                {/* <div>
                    <div className="mt-14 mb-11 pl-11 mt">
                        <h2 className="text-4xl text-white uppercase font-headings">Featured trailers</h2>
                    </div>
                </div> */}
                <div>
                    <TopPicksForYou />
                </div>
                {/* <div>
                    <div className="mt-14 mb-11 pl-11 mt">
                        <h2 className="text-4xl text-white uppercase font-headings">Popular casts</h2>
                    </div>
                </div> */}
            </div>

            <Footer />
        </>
    );
}
