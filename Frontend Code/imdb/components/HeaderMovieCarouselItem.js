import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const MovieCarouselItem = ({ title, description, img, rating, link }) => {
    const router = useRouter();
    return (
        <>
            <div className="carousel-item float-left w-full">
                <Link href={link}>
                    <a>
                        <Image
                            src={img}
                            className="block w-full carousel-overlay"
                            alt={title}
                            width={1700}
                            height={648}
                            quality={85}
                            objectFit="cover"
                            objectPosition="center"
                        />
                        <div className="carousel-caption hidden md:block absolute bottom-5 py-5 mb-2 lg:mb-20 lg:pr-40pct xl:pr-40pct">
                            <p className="border-transparent border-gray-500 rounded-xl w-fit text-lg bg-gray-800 bg-opacity-50 px-3 py-2 backdrop-blur-lg text-warning-500">
                                <i className="bi bi-star-fill text-lg"></i> {rating}
                            </p>
                            <h1 className="text-5xl xl:text-6xl mb-2">{title}</h1>
                            <p>{description}</p>
                            <button
                                className="mt-2 rounded-xl bg-primary-400 hover:bg-primary-300
                                    border px-5 py-3 w-fit border-transparent text-base font-medium text-white transition-colors flex"
                                type="button"
                                onClick={() => router.push(link)}
                            >
                                <img src="./watch_icon.svg" />
                                &nbsp;Watch trailer
                            </button>
                        </div>
                        <div className="carousel-caption block md:hidden absolute py-0 mb-9 bottom-0">
                            <h1 className="text-md">{title}</h1>
                        </div>
                    </a>
                </Link>
            </div>
        </>
    );
};

export default MovieCarouselItem;
