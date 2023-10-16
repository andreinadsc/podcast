import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useMediaQuery } from '@mui/material';
import Header from '../components/Header';
import PlayBar from '../components/PlayBar/PlayBar';
import useHttp from '../hooks/http';
import Error from '../components/Common/Error';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const RootLayout = () => {
    const isTablet = useMediaQuery((theme) => theme.breakpoints.between('sm', 'lg'));

    const { isLoading, error, sendRequest } = useHttp();
    const [searchValue, setSearchValue] = useState('');
    const [podcast, setPodcast] = useState([]);
    const [podcastEpisodes, setPodcastEpisodes] = useState([]);
    const [selectedPodcast, setSelectedPodcast] = useState(null);
    const [selectedEpisode, setSelectedEpisode] = useState(null);
    const [isPlaying, setIsPlaying] = useState({ isPlaying: false, id: null, collectionId: null });
    const [orderAttr, setOrderAttr] = useState(false);

    const inputRef = useRef();

    useEffect(() => {
        const fetchPodcasts = async () => {
            const term = searchValue.toString().replace(/[^a-zA-Z0-9]/g, ' ');
            await sendRequest(`https://itunes.apple.com/search?term=${term}&media=podcast`,
                (data) => {
                    setPodcast(data.map(d => ({
                        id: (d.collectionId).toString(),
                        name: d.collectionName,
                        img: d.artworkUrl600,
                        release: d.releaseDate,
                        author: d.artistName,
                        feedUrl: d.feedUrl,
                        description: `${d.collectionName} by ${d.artistName}`
                    })));
                }
            );
        };

        const timeout = setTimeout(() => {
            if (searchValue === inputRef.current.value && searchValue !== '') fetchPodcasts();
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchValue, sendRequest]);

    return (
        <>
            <Header setSearchValue={setSearchValue} searchValue={searchValue} inputRef={inputRef} />
            <Box component='main' width={!isTablet ? '832px' : '80vw'} >
                {searchValue && isLoading && !error && <LoadingSpinner />}
                {error && <Error error={error} />}
                {
                    !error && !isLoading &&
                    <Outlet
                        context={{
                            podcast,
                            isLoading,
                            error,
                            isPlaying,
                            podcastEpisodes,
                            selectedPodcast,
                            selectedEpisode,
                            orderAttr,
                            setSearchValue,
                            setSelectedEpisode,
                            setIsPlaying,
                            setSelectedPodcast,
                            setPodcastEpisodes,
                            setPodcast,
                            setOrderAttr
                        }} />
                }
            </Box>
            <PlayBar {...{setIsPlaying, isPlaying, selectedEpisode, setSelectedEpisode, podcastEpisodes }} />
        </>
    );
};

export default RootLayout;