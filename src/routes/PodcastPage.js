/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import useHttp from '../hooks/http';
import MenuWrapper from '../components/Common/MenuWrapper';
import ListPodcast from '../components/Podcast/ListPodcast';
import { Avatar, Box, Typography } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Pause, PlayArrow } from '@mui/icons-material';
import Error from '../components/Common/Error';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const HEADERS = [
    '#',
    'Title',
    'Topic',
    'Release',
    '🕞'
];

const getTagName = (item, property, attribute = null) => {
    const node = item.getElementsByTagName(property);
    return node && node[0] ?
        (
            !attribute ?
                node[0].textContent : node[0].getAttribute(attribute)
        ) : '';
};

const Podcast = () => {
    const { setSelectedEpisode, setSearchValue, setPodcastEpisodes, podcast, podcastEpisodes, isPlaying, setIsPlaying, setSelectedPodcast } = useOutletContext();
    const { isLoading, error, sendRequest } = useHttp();
    const { podcastId } = useParams();
    const [searchParams] = useSearchParams();

    const selectedPodcast = podcast.filter(pod => pod.id === podcastId);

    useEffect(() => {
        if (selectedPodcast?.length === 0) return;

        if (podcastEpisodes?.length > 0 && selectedPodcast?.id === podcastId) return;

        const fetchPodcastEpisodes = async () => {
            setSearchValue('');

            await sendRequest(selectedPodcast[0].feedUrl, (items) => {
                const arr = Array.from(items);
                setPodcastEpisodes(arr.map((item, index) => ({
                    index: index,
                    collectionId: selectedPodcast[0].id,
                    imgCollection: selectedPodcast[0].img,
                    author: selectedPodcast[0].author,
                    id: item.querySelector('guid').textContent,
                    name: item.querySelector('title').textContent,
                    description: item.querySelector('description').textContent,
                    release: item.querySelector('pubDate').textContent.split('-')[0],
                    img: getTagName(item, 'itunes:image', 'href'),
                    src: getTagName(item, 'enclosure', 'url'),
                    duration: getTagName(item, 'itunes:duration')
                })));

            }, false);
        }
        fetchPodcastEpisodes();
        if (searchParams.get('source') === 'click') setSelectedPodcast(selectedPodcast[0]);
    }, []);

    const onClickHandler = (event) => {
        setIsPlaying(prev => {
            return {
                isPlaying: !prev.isPlaying,
                collectionId: selectedPodcast[0].id,
                id: podcastEpisodes[0].id
            }
        });
        setSelectedPodcast(selectedPodcast[0])
        setSelectedEpisode(podcastEpisodes[0]);
    }

    return (
        <>
            {(isLoading && !error) &&
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    color: 'text.primary'
                }}>
                    <Typography >Loading podcasts episodes</Typography><br />
                    <LoadingSpinner />
                    <Typography >This might take a while</Typography>
                </Box>}
            {error && <Error error={error} />}
            {!isLoading && podcastEpisodes.length > 0 && selectedPodcast.length > 0 &&
                <>
                    <Box component='div' color='inherit' elevation={2} variant='relative'
                        sx={{
                            width: '826px',
                            height: '280px',
                            borderRadius: '15px',
                            background: `url(${selectedPodcast[0].img}) center center`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '100% 100%'
                        }}>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        padding: '1rem',
                        position: 'sticky'
                    }}>
                        <Avatar sx={{ bgcolor: 'primary.icons', cursor: 'pointer' }} onClick={onClickHandler}>
                            {isPlaying.isPlaying && isPlaying.collectionId === selectedPodcast[0]?.id
                                ? <Pause />
                                : <PlayArrow />}
                        </Avatar>
                        <Typography textAlign='center' color='text.primary' fontWeight={700} fontSize='32px'>
                            {selectedPodcast[0].name} <VerifiedIcon sx={{ fill: '#2096F3' }} />
                        </Typography>
                        <MenuWrapper
                            options={['Title','Topic','Release']} />
                    </Box>
                    <ListPodcast headers={HEADERS} list={podcastEpisodes} isPodcastList={true} />
                </>
            }
        </>
    );
}

export default Podcast;
