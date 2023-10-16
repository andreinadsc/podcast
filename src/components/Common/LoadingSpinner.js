import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = () => {
    return (
        <Box height='80vh'>
            <CircularProgress sx={{
                color: 'primary.icons', position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }} />
        </Box>
    );
}

export default LoadingSpinner;
