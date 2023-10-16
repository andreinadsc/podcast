import { Box, Avatar, IconButton } from '@mui/material';
import { PlayArrow, Replay, Shuffle, SkipNext, SkipPrevious, Pause } from '@mui/icons-material';

const Controllers = (props) => {
    const handleMovingEpisode = (event) => {
        props.resetAudio();
        const trigger = event.target.closest('button').id;
        const index = props.selectedEpisode.index + (trigger === 'next' ? 1 : -1);

        props.setSelectedEpisode(props.podcastEpisodes[index]);
        props.setIsPlaying({
            isPlaying: true,
            id: props.podcastEpisodes[index].id,
            collectionId: props.podcastEpisodes[index].collectionId
        });
    };

    const togglePlay = () => {
        props.setIsPlaying(prev => {
            return {
                ...prev,
                isPlaying: !prev.isPlaying
            }
        });
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', width: '15%' }}>
            <IconButton onClick={() => props.setShuffle(prev => !prev)} sx={{ color: props.shuffle ? 'primary.icons' : 'text.primary' }}>
                <Shuffle />
            </IconButton>
            <IconButton id='previous' disabled={props.selectedEpisode?.index === 0} onClick={handleMovingEpisode}>
                <SkipPrevious />
            </IconButton>
            <Avatar sx={{ bgcolor: 'primary.icons', cursor: 'pointer' }} onClick={togglePlay}>
                {props.isPlaying.isPlaying ? <Pause /> : <PlayArrow />}
            </Avatar>
            <IconButton id='next' disabled={props.selectedEpisode?.index === props.podcastEpisodes.length - 1} onClick={handleMovingEpisode}>
                <SkipNext />
            </IconButton>
            <IconButton onClick={() => props.setReplay(prev => !prev)} sx={{ color: props.replay ? 'primary.icons' : 'text.primary' }}>
                <Replay />
            </IconButton>
        </Box>
    );
}

export default Controllers;
