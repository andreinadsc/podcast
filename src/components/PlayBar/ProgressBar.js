import { Typography, Box } from '@mui/material';
import moment from 'moment';

import { styled } from '@mui/material/styles';

const Progress = styled('input')(({ theme }) => ({
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    cursor: 'pointer',
    width: '420px',
    background: 'transparent',
    '&:focus': {
        outline: 'none'
    },
    '&::-webkit-slider-runnable-track': {
        background: '#5f5f5f',
        borderRadius: '0.5rem',
        height: '0.3rem'
    },
    '&::-webkit-slider-thumb': {
        backgroundColor: theme.palette.text.primary,
        appearance: 'none',
        borderRadius: '50%',
        width: '.7rem',
        height: '.7rem',
        marginTop: '-3px',
        zIndex: 4,
        position: 'relative',
    },
    '&::-moz-range-track': {
        background: '#5f5f5f',
        borderRadius: '0.5rem',
        height: '0.3rem'
    },
    '&::-moz-range-thumb': {
        backgroundColor: theme.palette.text.primary,
        appearance: 'none',
        borderRadius: '50%',
        width: '.7rem',
        height: '.7rem',
        marginTop: '-3px',
        zIndex: 4,
        position: 'relative',
    },
    '&:before': {
        transform: 'scaleX(var(--progress-width))',
        zIndex: 3
    },
    '&:after': {
        transform: 'scaleX(var(--buffered-width))',
        transformOrigin: 'left',
        zIndex: 2
    }
}));

export default function AudioProgressBar(props) {
    const { duration, currentProgress, buffered, ...rest } = props;
    const progressBarWidth = isNaN(currentProgress / duration)
        ? 0
        : currentProgress / duration;
    const bufferedWidth = isNaN(buffered / duration) ? 0 : buffered / duration;
    const progressStyles = {
        '--progress-width': progressBarWidth,
        '--buffered-width': bufferedWidth,
    };

    return (
        <Box sx={{
            display: 'flex',
            marginLeft: '3rem'
        }}>
            <Typography sx={{
                paddingRight: '.5rem'
            }}>{moment.utc(currentProgress * 1000).format('HH:mm:ss')}</Typography>
            <Progress
                type='range'
                name='progress'
                style={progressStyles}
                min={0}
                max={duration}
                value={currentProgress}
                {...rest}
            />
            <Typography sx={{
                paddingLeft: '.5rem'
            }}>{duration ? moment.utc(duration * 1000).format('HH:mm:ss') : '00:00:00'}</Typography>
        </Box>
    );
}
