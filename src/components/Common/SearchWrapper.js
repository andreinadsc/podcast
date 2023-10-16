import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    backgroundColor: theme.palette.secondary,
    pointerEvents: 'none',
    top: '-0.03px',
    left: '-0.03px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const SearchWrapper = ({ searchValue, setSearchValue }) => {
    return (
        <Box sx={{
            position: 'relative',
            borderRadius: '15px',
            marginTop: '15px',
            padding: '0px 5px 0px 20px',
            width: '75%',
            margin: '10px',
            backgroundColor: 'primary.secondary'
        }}>
            <SearchIconWrapper>
                <SearchIcon sx={{
                    width: '20.02px',
                    height: '20.02px'
                }} />
            </SearchIconWrapper>
            <InputBase
                autoFocus
                placeholder='Search Podcast…'
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
            />
        </Box>
    );
}

export default SearchWrapper;
