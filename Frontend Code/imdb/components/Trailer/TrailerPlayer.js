import React from "react";
import YouTube from 'react-youtube';

const TrailerPlayer = ({id}) => {
    const onPlayerReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    return (
        <>
            <YouTube
                videoId={id}
                opts={opts}
                onReady={onPlayerReady}
            />
        </>
    )
};

export default TrailerPlayer;
