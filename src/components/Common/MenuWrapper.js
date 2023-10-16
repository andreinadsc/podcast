import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { ExpandMore } from '@mui/icons-material';
import { Menu, MenuItem, IconButton, Fade } from '@mui/material';

const MenuWrapper = ({ options }) => {
    const { setOrderAttr } = useOutletContext();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => setAnchorEl(event.currentTarget);

    const handleClose = (event) => {
        setOrderAttr(event.target.textContent);
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton onClick={handleClick} sx={{ float: 'right', fontSize: '16px', position: 'relative' }}>
                Order By
                <ExpandMore />
            </IconButton>
            <Menu
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: 'primary.main'
                    }
                }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {
                    options.map(option => <MenuItem key={option} onClick={handleClose}>{option}</MenuItem>)
                }
            </Menu>
        </>
    );
}

export default MenuWrapper;
