import { Alert, AlertTitle } from '@mui/material';
import { Link } from 'react-router-dom';

const Error = ({ error }) => {
    return (
        <Alert severity='error'>
            <AlertTitle>Error</AlertTitle>
            Something went wrong — <strong>{error}</strong><br />
            <Link to='/' >
                Go back to the search page
            </Link>
        </Alert>
    );
}

export default Error;
