import { Link, Navigate, useLocation } from 'react-router-dom'
import { AppBar, IconButton, Box, InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import {Search, ArrowBack} from '@mui/icons-material';

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

const Header = ({ setSearchValue, searchValue, inputRef }) => {
    const { pathname } = useLocation();

    return (
        <AppBar position='static' sx={{
            justifyItems: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent'
        }}>
            {pathname !== '/' &&
                <IconButton component={Link} to='/'
                    sx={{
                        position: 'absolute',
                        top: '1%',
                        left: '8%',
                        height: '2.7rem',
                        fontSize: '34px',
                        width: '4%',
                        backgroundColor: 'primary.secondary',
                        borderRadius: '5px',
                    }}
                >
                    <ArrowBack sx={{ color: 'text.primary', }} />
                </IconButton>
            }
            {searchValue !== '' && <Navigate to='/' replace={true} />}
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
                    <Search sx={{
                        width: '20.02px',
                        height: '20.02px'
                    }} />
                </SearchIconWrapper>
                <InputBase
                    autoFocus
                    inputRef={inputRef}
                    placeholder='Search Podcast…'
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                />
            </Box>
        </AppBar>
    );
}

export default Header;
