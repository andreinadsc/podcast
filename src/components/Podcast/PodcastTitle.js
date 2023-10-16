import { Link } from 'react-router-dom';
import { Typography } from '@mui/material'

const PodcastTitle = ({ id, name, img, author }) => {
    return (
        <>
            {
                img ?
                    <Link to={ (!/\d+/.test(id)) ? -1 : `podcasts/${id}`}
                        style={{
                            textDecoration: 'none',
                            display: 'flex',
                            justifyContent: 'self-start',
                            alignItems: 'center' 
                        }}>
                        <img src={img} alt={name} loading='lazy' width='45px' height='45px' style={{
                            flexShrink: 0, borderRadius: '8px', float: 'left', 
                        }} />
                        <Typography component='h4' color='text.primary' fontSize='16px' ml='7px' sx={{ float: 'right' }}>
                            {name}
                            <Typography component='p' color='text.secondary' fontSize='14px' >
                                {author}
                            </Typography>
                        </Typography>
                    </Link>
                    :
                    <Typography  component='h4' color='text.primary' fontSize='16px' ml={1} >
                        {name}
                        <Typography component='p' color='text.secondary' fontSize='14px'>
                            {author}
                        </Typography>
                    </Typography>
            }
        </>
    );
}

export default PodcastTitle;
