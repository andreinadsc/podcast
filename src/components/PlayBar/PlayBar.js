import { useCallback, useEffect, useRef, useState } from 'react';
import { AppBar, Box, Typography } from '@mui/material';
import Controllers from './Controllers';
import AudioProgressBar from './ProgressBar';
import Volume from './Volume';

const PlayBar = ({ setIsPlaying, isPlaying, selectedEpisode, setSelectedEpisode, podcastEpisodes }) => {
    const [shuffle, setShuffle] = useState(false);
    const [replay, setReplay] = useState(false);
    const [timeProgress, setTimeProgress] = useState(0);
    const [volume, setVolume] = useState(60);
    const [isMuted, setIsMuted] = useState(false);
    const [duration, setDuration] = useState();
    const [buffered, setBuffered] = useState(0);
    const audioRef = useRef();

    const resetAudio = () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    };

    const handleNext = useCallback(() => {
        resetAudio();

        if (replay) {
            audioRef.current.play();
            return;
        }

        const index = shuffle ? Math.floor(Math.random() * (podcastEpisodes.length + 1)) :
            selectedEpisode.index + 1;

        setSelectedEpisode(podcastEpisodes[index]);
        setIsPlaying({
            isPlaying: true,
            id: podcastEpisodes[index].id,
            collectionId: podcastEpisodes[index].collectionId
        });

    }, [selectedEpisode, podcastEpisodes, replay, setSelectedEpisode, shuffle, setIsPlaying]);

    useEffect(() => {
        if (selectedEpisode?.id === isPlaying?.id) {
            resetAudio();
            if (isPlaying.isPlaying) {
                audioRef?.current?.load();
                audioRef?.current?.play();
            }
            else audioRef?.current?.pause();

            if (audioRef?.current) {
                audioRef.current.volume = volume / 100;
                audioRef.current.muted = isMuted;
            }
        }
    }, [isPlaying, audioRef, selectedEpisode, isMuted, volume]);

    const handleBufferProgress = (e) => {
        const audio = e.currentTarget;
        const dur = audio.duration;
        if (dur > 0) {
            for (let i = 0; i < audio.buffered.length; i++) {
                if (
                    audio.buffered.start(audio.buffered.length - 1 - i) <
                    audio.currentTime
                ) {
                    const bufferedLength = audio.buffered.end(
                        audio.buffered.length - 1 - i
                    );
                    setBuffered(bufferedLength);
                    break;
                }
            }
        }
    };

    return (
        <>
            {selectedEpisode?.id === isPlaying?.id && selectedEpisode.collectionId === isPlaying.collectionId && 
                <AppBar component='div' position='sticky' color='primary'
                    sx={{ top: '-100vw', bottom: 0, width: '100%', height: '110px', left: 0, right: 0 }}>
                    <audio preload='metadata' ref={audioRef} onEnded={handleNext} onDurationChange={(e) => setDuration(e.currentTarget.duration)}
                        onTimeUpdate={(e) => {
                            setTimeProgress(e.currentTarget.currentTime);
                            handleBufferProgress(e);
                        }}
                        onProgress={handleBufferProgress}
                    >
                        <source type='audio/mpeg' src={selectedEpisode.src} />
                    </audio>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={selectedEpisode.img || selectedEpisode.imgCollection}
                            loading='lazy'
                            height='110px'
                            width='110px'
                            alt='podcast'
                        />
                        <Box sx={{ width: '277px', paddingLeft: '1rem' }}>
                            <Typography fontWeight={500} fontSize='16px' lineHeight='20px' sx={{ width: '277px' }}>
                                {selectedEpisode.name}
                            </Typography>
                            <Typography textAlign='left' color='text.secondary' >{selectedEpisode.author}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', width: '831px', marginLeft: '7%' }}>
                            <Box component='div' sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Controllers
                                    {...{
                                        setIsPlaying, isPlaying, selectedEpisode,
                                        setSelectedEpisode, podcastEpisodes, setReplay, setShuffle, replay, shuffle,
                                        resetAudio
                                    }}
                                />
                                <AudioProgressBar
                                    duration={duration}
                                    currentProgress={timeProgress}
                                    buffered={buffered}
                                    onChange={(e) => {
                                        if (!audioRef.current) return;

                                        audioRef.current.currentTime = e.currentTarget.valueAsNumber;

                                        setTimeProgress(e.currentTarget.valueAsNumber);
                                    }}
                                />
                            </Box>
                            <Box sx={{width:'135px', marginLeft: '-5%'}}>
                                <Volume {...{ volume, setVolume, isMuted, setIsMuted }} />
                            </Box>
                        </Box>
                    </Box>
                </AppBar>
            }
        </>

    );
}

export default PlayBar;
