import React from 'react'
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
import useSWRImmutable from "swr/immutable"
import Loader from '../Loader';

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

const fetcher = (...args) => fetch(...args).then(res => res.json())

const TrailerButton = ({ movieID }) => {
    const apiurl = "https://api.themoviedb.org/3/movie/" + movieID + "/video?&api_key=" + process.env.TMDB_API_KEY + "&language=en-US"
    const { data, error } = useSWRImmutable(apiurl, fetcher)
    const res = data && data.results
    const videos = res && res.filter((e) => e.type === "Trailer")
    const trailerID = (videos && videos.length > 0) ? data.results[0].key : "No videos"
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
      console.log(data)
    
      
    }, [])
    

    return (
        <div>
            <button
                className="mb-5 rounded-xl bg-primary-400 hover:bg-primary-300
                                    border px-5 py-3 w-fit border-transparent text-base font-medium text-white transition-colors flex"
                type="button"
                onClick={handleClickOpen}
            >
                <img src="/watch_icon.svg" />
                &nbsp;Watch trailer
            </button>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Modal title
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {
                        <Loader show={!data && !error}/>
                    }
                    {
                        trailerID === "No videos" ? <p className="font-primary text-xl py-5 px-5">No videos</p>
                        : 
                        <TrailerPlayer id={trailerID}/>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    )
}

export default TrailerButton