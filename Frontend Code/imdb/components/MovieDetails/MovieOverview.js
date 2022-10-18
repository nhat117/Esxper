import React, { useEffect, useState } from "react";
import moment from "moment";
import Image from "next/image";
import Loader from "../Loader";
import useGetCredits from "../../hooks/useGetCredits";
import Rating from "@mui/material/Rating";
import { StarBorderRounded, StarRateRounded } from "@mui/icons-material";
import { useUserData } from "../../hooks/useUserData";
import { toast } from "react-toastify";
import { Auth, Amplify, Analytics } from "aws-amplify";
import TrailerButton from "./TrailerButton";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TrailerPlayer from '../Trailer/TrailerPlayer';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const CastCrewOverview = ({ movieID }) => {
    const { data_castcrew, isLoading, isError } = useGetCredits(movieID);
    const crewArr = data_castcrew && data_castcrew.crew;
    const castArr = data_castcrew && data_castcrew.cast;
    const directors = crewArr && crewArr.filter((el) => el.job === "Director");
    const writers = crewArr && crewArr.filter((el) => el.department === "Writing");
    const starrings = castArr && castArr.filter((el) => el.order < 3);

    return (
        <>
            <Loader show={isLoading}></Loader>
            <p className="text-sm mb-1 text-gray-400">Starrings</p>
            <p className="text-lg mb-5 text-gray-200">
                {starrings &&
                    starrings.map((e, i) => {
                        if (i === starrings.length - 1) {
                            return <span key={i}>{e.name} </span>;
                        }
                        return (
                            <span key={i}>
                                {e.name} <i className="bi bi-dot"></i>{" "}
                            </span>
                        );
                    })}
            </p>
            <p className="text-sm mb-1 text-gray-400">Directed by</p>
            <p className="text-lg mb-5 text-gray-200">
                {directors &&
                    directors.map((e, i) => {
                        if (i === directors.length - 1) {
                            return <span key={i}>{e.name} </span>;
                        }
                        return (
                            <span key={i}>
                                {e.name} <i className="bi bi-dot"></i>{" "}
                            </span>
                        );
                    })}
            </p>
            <p className="text-sm mb-1 text-gray-400">Written by</p>
            <p className="text-lg mb-5 text-gray-200">
                {writers &&
                    writers.map((e, i) => {
                        if (i === writers.length - 1) {
                            return <span key={i}>{e.name} </span>;
                        }
                        return (
                            <span key={i}>
                                {e.name} <i className="bi bi-dot"></i>{" "}
                            </span>
                        );
                    })}
            </p>
        </>
    );
};
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const MovieOverview = ({ poster, tagline, overview, release_date, runtime, movieID }) => {
    const { user, isLoading } = useUserData();
    const [currentRating, setCurrentRating] = useState(0);
    const apiurl = "https://l9r8bafvh6.execute-api.ap-southeast-1.amazonaws.com/test/movies/rate";
    const [trailer, setTrailer] = useState("")
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const postRateMovie = (newRatingValue) => {
        const data = {
            movie_id: movieID,
            user_id: user["custom:USER_ID"],
            rating: newRatingValue,
        };
        fetch(apiurl, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                toast.success("🌟 Thank you for your rating", {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                console.log("Success:", data);
            })
            .catch((e) => {
                const err = "" + e;
                toast.error(err, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                console.error("Error:", e);
            });
    };

    let trailerVideoID = ""

    useEffect(() => {
        const runAnalytics = async () => {
            // Get current user
            const currentUser = await Auth.currentAuthenticatedUser();

            // Get the latest rating of current user for the movie
            const res = await fetch(
                `https://l9r8bafvh6.execute-api.ap-southeast-1.amazonaws.com/test/ratings?user_id=${currentUser.attributes["custom:USER_ID"]}&movie_id=${movieID}`,
                {
                    method: "GET",
                }
            );
            const currentRatings = await res.json();
            if (currentRatings && currentRatings.length > 0) {
                setCurrentRating(currentRatings[0].rating);
            }

            // Run kinesis analytics
            if (currentUser) {
                Analytics.record(
                    {
                        data: {
                            EventType: "clicked",
                            UserId: currentUser.attributes["custom:USER_ID"],
                            SessionId: "",
                            ItemId: movieID,
                        },
                        streamName: "amplifyAnalyticsExsper-staging",
                    },
                    "AWSKinesis"
                );
            }
        };

        const getTrailerVideo = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=2f4c505c479056c8095f1838e6d567c3&language=en-US`, { method: "GET" })
            const vids = await res.json()
            const VidRes = vids && vids.results
            const sortedVids = (vids && VidRes) && VidRes.filter((e) => e.type === "Trailer")
            const trailerID = (sortedVids && sortedVids.length > 0) ? sortedVids[0].key : ""
            console.log(vids)
            console.log(VidRes)
            console.log(sortedVids)
            setTrailer(trailerID)
        }

        getTrailerVideo();
        runAnalytics();
        
        console.log(trailer)
    }, []);

    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Trailer
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {
                        <TrailerPlayer id={trailer} />
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
            <div className="text-white mt-36 md:mt-48 md:grid md:grid-cols-2 mx-auto container w-10/12">
                <div className="hidden md:block">
                    <Image
                        src={poster}
                        className="poster"
                        alt={tagline}
                        quality={85}
                        width={480}
                        height={720}
                        objectFit="cover"
                        objectPosition="center"
                    />
                </div>
                <div>
                    <div>
                        <p className="text-lg md:text-xl font-bold mb-5">{tagline}</p>
                        <button
                            className="mb-5 rounded-xl bg-primary-400 hover:bg-primary-300
                                                border px-5 py-3 w-fit border-transparent text-base font-medium text-white transition-colors flex"
                            type="button"
                            onClick={handleClickOpen}
                        >
                            <img src="/watch_icon.svg" />
                            &nbsp;Watch trailer
                        </button>
                        <p className="text-base md:text-lg mb-5 text-gray-200">{overview}</p>
                        <p className="text-sm mb-1 text-gray-400">Release Date</p>
                        <p className="text-base md:text-lg mb-5 text-gray-200">
                            {moment(release_date).format("MMMM Do YYYY")}
                        </p>
                        <p className="text-sm mb-1 text-gray-400">Duration</p>
                        <p className="text-base md:text-lg mb-5 text-gray-200">{runtime} min</p>
                        <CastCrewOverview movieID={movieID}></CastCrewOverview>
                    </div>
                    <hr className="mt-5 border-gray-600" />
                    <div className="mt-5 rounded-2xl bg-gray-600 bg-opacity-50 w-fit px-5 py-5 backdrop-blur-xl">
                        <p className="text-lg md:text-xl font-bold mb-1">Rate this movie</p>
                        <div className="flex justify-center">
                            {isLoading ? (
                                <>
                                    <Loader show={isLoading} />
                                </>
                            ) : !isLoading && user ? (
                                <>
                                    <Rating
                                        name="simple-controlled"
                                        value={currentRating}
                                        onChange={(event, newValue) => {
                                            setCurrentRating(newValue);
                                            postRateMovie(newValue);
                                        }}
                                        precision={0.5}
                                        icon={<StarRateRounded />}
                                        emptyIcon={<StarBorderRounded className="text-gray-400" />}
                                    />
                                </>
                            ) : (
                                <p>Please login to rate this movie</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieOverview;
