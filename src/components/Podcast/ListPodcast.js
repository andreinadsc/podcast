import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import moment from 'moment';
import parser from 'html-react-parser';

import { Pause, PlayArrow, ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { Collapse, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material'
import PodcastTitle from './PodcastTitle';

const ListPodcast = ({ headers, list, isPodcastList = false }) => {
    const { pathname } = useLocation();
    const {
        isPlaying, setIsPlaying,
        podcastEpisodes, setSelectedEpisode, orderAttr, selectedEpisode, selectedPodcast, setOrderAttr } = useOutletContext();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortedList, setSortedList] = useState([]);
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const handlerPodcastPlay = (event) => {
        const { id } = event.target.closest('td');

        if (pathname === '/') {
            setIsPlaying(prev => {
                if ((prev.id === id && selectedPodcast.id === prev.collectionId) && prev.isPlaying) {
                    return {
                        id: prev.id,
                        isPlaying: false,
                        collectionId: selectedPodcast?.id
                    }
                }
                return {
                    isPlaying: true,
                    id: null,
                    collectionId: id
                }
            })

            navigate(`/podcasts/${id}?source=click`);
        } else {
            const selectedEpisode = podcastEpisodes.filter(pod => pod.id === id)
            setIsPlaying(prev => {

                if ((prev.id === id && selectedPodcast?.id === prev.collectionId) && prev.isPlaying) {
                    return {
                        id: prev.id,
                        isPlaying: false,
                        collectionId: selectedPodcast?.id
                    }
                }
                return {
                    isPlaying: true,
                    id: selectedEpisode[0].id,
                    collectionId: selectedEpisode[0].collectionId
                }
            });
            setSelectedEpisode(...selectedEpisode);
        }
    }

    const handleChangePage = (_, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        if (!orderAttr) return;

        let sortableItems = [...sortedList];
        let key = orderAttr.toLowerCase();
        key = key === 'title' ? 'name' : key === 'topic' ? 'description' : key;

        if (orderAttr !== null) {
            sortableItems.sort((a, b) => {
                if (key === 'release') 
                    return new Date(a[key]) > new Date(b[key]) ? -1 : 1;
                else 
                    return a[key] > b[key] ? -1 : 1
                }
            );
        }

        setOrderAttr(false)
        setSortedList(sortableItems);

    }, [orderAttr, sortedList, setOrderAttr]);

    useEffect(() => {
        setSortedList([...list]);

        if (isPlaying.isPlaying &&
            selectedPodcast?.id === isPlaying.collectionId && !isPlaying?.id &&
            podcastEpisodes.length > 0) {

            setSelectedEpisode({
                ...podcastEpisodes[0],
                collectionId: selectedPodcast.id,
                imgCollection: selectedPodcast.img,
                author: selectedPodcast.author
            });
            setIsPlaying(prev => {
                return {
                    isPlaying: true,
                    collectionId: prev.collectionId,
                    id: podcastEpisodes[0].id
                }
            })
        }
    }, [isPlaying, list, selectedEpisode, selectedPodcast, setIsPlaying, podcastEpisodes, setSelectedEpisode]);

    return (
        <>
            <TableContainer sx={{ width: '832px' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <TableCell
                                    key={header}
                                >
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            sortedList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(item => (
                                    <TableRow key={item.id} >
                                        <TableCell id={item?.id} sx={{
                                            width: '30px',
                                            color: 'text.primary',
                                            cursor: 'pointer'
                                        }} onClick={handlerPodcastPlay}>
                                            {isPlaying.isPlaying
                                                && (isPodcastList ? isPlaying?.id === item.id && isPlaying.collectionId === item.collectionId
                                                    : isPlaying.collectionId === item.id)
                                                ? <Pause /> : <PlayArrow />}
                                        </TableCell>
                                        <TableCell sx={{ width: '174px' }}>
                                            <PodcastTitle {...{ ...item }} />
                                        </TableCell>
                                        <TableCell onClick={() => setExpanded(prev => !prev)} width='210px'>
                                            {item.description.length > 200 && (expanded ? <ArrowDropUp /> : <ArrowDropDown />)}
                                            <Collapse
                                                collapsedSize={100}
                                                in={expanded}
                                            >
                                                <Typography component='span' overflow='hidden'>{parser(item.description)}</Typography>
                                            </Collapse>
                                        </TableCell>
                                        <TableCell width='92px'>
                                            {moment(item.release).fromNow()}
                                        </TableCell>
                                        {
                                            item.duration &&
                                            <TableCell width='37px'>
                                                {item.duration.indexOf(':') > -1 ? item.duration : moment.utc(item.duration * 1000).format('HH:mm:ss')}
                                            </TableCell>
                                        }
                                    </TableRow>
                                ))
                        }
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10, 25]}
                    component='div'
                    count={sortedList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </>
    );
}

export default ListPodcast;
