import {  Stack, Slider, IconButton } from '@mui/material'
import { VolumeDown, VolumeUp, VolumeOff } from '@mui/icons-material';

const Volume = ({volume, setVolume, isMuted, setIsMuted}) => {
    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
    };

    return (
        <Stack spacing={2} direction='row' sx={{ mb: 1, px: 1 }} alignItems='center' width='125px'>
            {
                <IconButton onClick={() => setIsMuted(prev => !prev)}>
                    { isMuted || volume === 0 ? <VolumeOff /> 
                    : (volume > 40 ? <VolumeUp /> : <VolumeDown />)}
                </IconButton>
            }
            <Slider
                onChange={handleVolumeChange}
                aria-label='Volume'
                defaultValue={30}
                value={volume}
                min={0}
                max={100}
                sx={{
                    color: '#5f5f5f',
                    width: '100px',
                    '& .MuiSlider-track': {
                        width: '100px !important'
                    },
                    '& .MuiSlider-thumb': {
                        width: 12,
                        height: 12,
                        backgroundColor: '#fff',
                        
                    },
                }}
            />

        </Stack>
    );
}

export default Volume;